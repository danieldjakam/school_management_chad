import { host } from "./fetch"

export const handleChangeCsvFile = (e, fetchUrl, setError) => {
    const url = URL.createObjectURL(e.target.files[0])
    
    fetch(url)
        .then(r => r.text())
        .then(r => {
            fetch(host+fetchUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.user,
                },
                method: 'POST',
                body: JSON.stringify({
                    csvText: r
                })
            })
                .then(resp => {
                    if (resp.success) {
                        window.location.reload()
                    } else {
                        setError(resp.message)
                    }
                })
                .catch(err => {
                    setError('Erreur: '+err)
                })
        })
}