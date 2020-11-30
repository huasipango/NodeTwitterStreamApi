const Twit = require('twit');
const sqlite3 = require('sqlite3')
require('dotenv').config();

const T = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret,
});

let db = new sqlite3.Database('database_twitter.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

var twitter_accounts = [];
twitter_accounts.push('777891400297897985');//EcuadorChequea
twitter_accounts.push('97513349');//CNNEE
twitter_accounts.push('35075352');//Fundamedios
twitter_accounts.push('851108442');//AFPespanol
twitter_accounts.push('6135622');//DW Español
twitter_accounts.push('7996082');//el_pais
twitter_accounts.push('19923515');//ABC.es
twitter_accounts.push('133945128');//NTN24
twitter_accounts.push('4685926452');//RadioRedonda
twitter_accounts.push('89563373');//@tomebamba
twitter_accounts.push('1051801902474821632');//primicias
twitter_accounts.push('201867844');//reuterslatam
twitter_accounts.push('312784108');//gkecuador
twitter_accounts.push('1671358760');//revistaplanv
twitter_accounts.push('10012122');//bbcmundo
twitter_accounts.push('95217117');//teleamazonasec
twitter_accounts.push('256747696');//ecuavisainforma
twitter_accounts.push('3592319536');//laposta_ecu
twitter_accounts.push('167391967');//lahoraecuador
twitter_accounts.push('4748612777');//4pelagatos4
twitter_accounts.push('1304214231663939586');//nuevotiempocue
twitter_accounts.push('234916423');//radiosonorama
twitter_accounts.push('139141667');//codigovidrioec
twitter_accounts.push('563350368');//ecu911_
twitter_accounts.push('186471345');//igecuador
twitter_accounts.push('1486779726');//espaciadorabar
twitter_accounts.push('246507155');//larepublica_ec
twitter_accounts.push('2396731321');//lahistoriaec
twitter_accounts.push('202282454');//policiaecuador
twitter_accounts.push('303941159');//riesgos_ec
twitter_accounts.push('101895924');//presidencia_ec
twitter_accounts.push('221442560');//mingobiernoec
twitter_accounts.push('159162810');//cnegobec
twitter_accounts.push('1316964650836164610');//cpccsec
twitter_accounts.push('134671641');//fiscaliaecuador
twitter_accounts.push('27807595');//utpl
twitter_accounts.push('56502954');//asambleaecuador
twitter_accounts.push('105082141');//efenoticias

var stream = T.stream('statuses/filter', { follow: twitter_accounts });

stream.on('tweet', function (tweet) {
    if (!tweet.retweeted_status && !tweet.in_reply_to_status_id && !tweet.in_reply_to_user_id) {
        saveOnDb(tweet);
    }
});

async function saveOnDb(tweet){
    let sql = `INSERT INTO tweets (user, user_name, content, date_time) VALUES (
        '${tweet.user.screen_name}',
        '${tweet.user.name}',
        '${tweet.text}',
        '${tweet.created_at}');`;
    await db.run(sql, function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Row inserted ${this.changes}`);
    });
}
