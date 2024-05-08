
const backend = 'http://localhost:3000';
export default function visitURL(url){
    fetch(backend+url, {
        headers: {
            Authorization: this.token,
        },
        method: 'GET',
    }).then((response) => {
        const data = response.json();
        if (response.status === 200) {
            return data;
        }
        throw Error("Can't get games!");
    }).then((data) => {
        this.updateAllGames(data.quizzes);
    }).catch((err) => {
        console.log(err);
    });
}