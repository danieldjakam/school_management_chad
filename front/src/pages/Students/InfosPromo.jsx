import React from 'react';

function SelectClass({setShowInfos}) {
    const handleCancel = () => {
        setShowInfos(v => !v);
    }
    return ( <div className="card login-card">
        <div className="card-head">
            <h1>
                Infos sur l'exportation des eleves.
            </h1>
        </div>
        <div className="card-content">
            <h5>
                Sur cette page vous allez exporter/promouvoir un eleve dans une autre classe.
            </h5>
            <p>
                C'est une operation assez simple suffir juste de cliquer sur le bouton d'envoi et c'est tout.
            </p>
            <p>
                C'est une action irreversible. Une fois le bouton cliqué l'élève se retrouvera dans cette classe l'année prochaine. <br />
                Tous les élèves pour qui ont aura cliquer sur redoublant seront dans la meme classe l'anne prochaine lorsque vous changerez les notes. <br />
            </p>
            <p>
                Les moyennes annuelles sont là pour vous aider à délibérer.
            </p>
            <p className="text-danger">
                Svp veuillez cliquer une fois sur le bouton parceque lors du clic l'enfant est envoye dans la classe pour l'annee prochaine ou redouble 
                la classe l'annee prochaine mais il reste toujours dans la classe. Donc on ne saura pas quil a ete envoye mais il sera envoye. <br />
                Donc autant de fois que vous cliquerez pour un eleve autant de fois il sera envoye dans la classe.
            </p>
        </div>
        <div className="card-footer">
            <button onClick={() => {handleCancel()}} type="reset">Compris</button>
        </div>
    </div>
    )
}

export default SelectClass