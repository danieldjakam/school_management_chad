import inquirer from "inquirer";
import jwt from 'jsonwebtoken';
import {createConnection} from 'mysql2';
import bcrypt from 'bcrypt';



const secret_key = ',flf,m;lsmgl;g,smg,smm:#@$03q4i-030-qi4095jo4j54[2por443+643634455634456fdsgs=g=gf=s=594-0tl;r'

const arg = process.argv[2]
if(arg === 'createschool'){
    const connection = createConnection({
        host: 'localhost',
        user: 'root',
        database: 'school_management',
        password: '',
    })
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Quel sera le nom de l\'ecole ?',
                name: 'school_name',
            },
            {
                type: 'password',
                message: 'Entrer un code secret pour l\'ecole (une sorte de mot de passe quoi !!) :',
                name: 'code_secret'
            },
            {
                type: 'password',
                message: 'Confirmez le code secret :',
                name: 'code_secret_confirm'
            }
        ])
        .then(answers => {
            const name_length = 1;
            connection.query('SELECT * FROM schools WHERE name = ?', [answers.school_name], (err, schools) => {
                if (schools.length < 1) {
                    if (!answers.school_name) {
                        console.log("Nom d'ecole obligatoire !! \n Veuillez recommencer.");
                    }
                    if(answers.school_name.length < name_length){
                        console.log(`Le nom de l'ecole doit au moins avoir ${name_length} caracteres !!`);
                    }
                    else if(!answers.code_secret){
                        console.log("Le code secret de l'ecole obligatoire car il empechera les autres super utilisateurs a acceder a votre ecole !! \n Veuillez recommencer.");
                    }
                    else if(!answers.code_secret.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)){
                        console.log("Code secret incorrect: minimum 8 caratères, une majuscule et un caractère spécial.");
                    }
                    else if (answers.code_secret !== answers.code_secret_confirm){
                        console.log('Les deux codes secrets ne correspondent pas!!');
                    }
                    else{
                        const salt = bcrypt.genSaltSync();
                        const password = bcrypt.hashSync(answers.code_secret, salt)
                        connection.query('INSERT INTO schools(id, name, secret_code) VALUES(?, ?, ?)', [jwt.sign(answers.school_name, secret_key), answers.school_name, password], async (err, resp) => {
                            if (err) {
                                console.log(`Une erreur est survenue: ${err }`);
                            } else {
                                console.log(`L'ecole '${answers.school_name}' a bien ete enregistre.`);
                            }
                        })
                    }
                } else {
                    console.log(`Une ecole a deja ete enregistre au nom de '${answers.school_name}'`);
                }
                connection.destroy();
            })
        })
        .catch(err => {
            console.log('Une erreur est survenue :' + err);
        })
}
else if(arg === 'createsuperuser') {
    const connection = createConnection({
        host: 'localhost',
        user: 'root',
        database: 'school_management',
        password: '',
    })
    connection.query('SELECT id, name, secret_code FROM schools ORDER BY name', (err, schools) => {
        if (err) {
            console.log('Une erreur est survenue');
        } else {
            const choices = []
            schools.map(school => {
                choices.push(school.name);
                return;
            })
            if (schools.length > 0) {
                inquirer
                    .prompt([
                        {
                            "type": "input",
                            "message": "Quel est le nom d'utilisateur ?",
                            "name": "username"
                        },
                        {
                            type: "input",
                            message: "Entrer l'email",
                            name: 'email'
                        },
                        {
                            type: 'password',
                            message: 'Entrer votre mot de passe !!) :',
                            name: 'password'
                        },
                        {
                            type: 'password',
                            message: 'Confirmez votre mot de passe :',
                            name: 'password_confirm'
                        },
                        {
                            type: "list",
                            message: 'Choisissez une ecole :',
                            name: 'school_name',
                            choices: choices
                        },
                        {
                            type: "password",
                            message: 'Entrer le code secret de l\'ecole choisie :',
                            name: 'school_secret_code',
                        }
                    ])
                    .then(answers => {
                        connection.query('SELECT * FROM users WHERE username = ?', [answers.username], (err3, users) => {
                            if (err3) {
                                console.log(`Erreur : ${err3}`);
                            } else {
                                if (users.length > 0) {
                                    console.log(`Un superutilisateur a deja ete cree avec le nom ${users[0].username}`);
                                } else {
                                    if (!answers.username && !answers.email && !answers.password && !answers.password_confirm && answers.school_name) {
                                        console.log(`Tous les cheamps sont obligatoires.`);
                                    }
                                    else if(answers.username < 3 || answers.username > 20 ){
                                        console.log(`Le nom d'utilisateur doit etre compris entre 3 et 20 caracteres.`);
                                    }
                                    else if(!answers.username.match(/^[a-zA-Z0-9_.-]*$/)){
                                        console.log(`Le nom d'utilisateur ne doit pas contenir de caracteres speciaux.`);
                                    }
                                    else if(!answers.email.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)){
                                        console.log(`Le format d'email est incorrect !!`);
                                    }
                                    else if(!answers.password.match(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)){
                                        console.log("Mot de passe incorrect: minimum 8 caratères, une majuscule et un caractère spécial.");
                                    }
                                    else if (answers.password !== answers.password_confirm){
                                        console.log('Les deux mots de passe ne correspondent pas!!');
                                    }
                                    else {
                                        const targetSchool = schools.filter(sc => sc.name === answers.school_name)[0]
                                        const isOk = bcrypt.compareSync(answers.school_secret_code, targetSchool.secret_code)
                                        if (isOk) {
            
                                            const salt = bcrypt.genSaltSync();
                                            const password = bcrypt.hashSync(answers.password, salt);
                                            connection.query(`INSERT INTO users(id, username, email, password, school_id) VALUES(?, ?, ?, ?, ?)`, [jwt.sign(answers.username+targetSchool.id, secret_key), answers.username, answers.email, password, targetSchool.id], (err2, resp) => {
                                                if (err2) {
                                                    console.log(`Erreur : ${err2}`);
                                                } else {                                        
                                                    console.log(`${answers.username} a bien ete enregistre comme superadmin de ${answers.school_name}`);
                                                }
                                            })
                                        } else {
                                            console.log(`Le code secret entre n'est pas celui de l'ecole !!`);        
                                        }
                                    }
                                }
                                connection.destroy()
                            }
                        })
                    })
                    .catch(err => {
                        console.log(`Erreur: ${err}`);
                    })
            }else{
                console.log("Aucune ecole n'a ete cree. Veuillez creer une ecole en tapant : npm run createschool");
                connection.destroy()
            }
        }
    })
}
else{
    console.log(`Commande erronee: veuillez choisir entre npm run createschool pour creer une ecole et npm run createsuperuser pour creer un super utilisateur (cela vous devez d'abord creer une ecole afin que celui ci l'administre).`);
}