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
            <p className="text-danger">
                Attention !!
            </p>
            <p>
                C'est une action irreversible. Une fois le bouton cliqué l'élève se retrouvera dans cette classe l'année prochaine. <br />
                Tous les élèves dont la classe n'aura pas été choisie resteront et seront considérés comme redoublant. <br />
            </p>
            <p>
                Les moyennes annuelles sont là pour vous aider à délibérer.
            </p>
        </div>
        <div className="card-footer">
            <button onClick={() => {handleCancel()}} type="reset">Compris</button>
        </div>
    </div>
    )
}

export default SelectClass