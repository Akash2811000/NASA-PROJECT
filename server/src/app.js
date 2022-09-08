const  express = require('express')
const app = express();
const path = require('path')
const  morgan = require('morgan');
const api = require('./routes/api');


//app.use(morgan('common'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use('/site',express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/v1',api)
app.get('/',(req,res)=> {
    console.log(__dirname);
    res.sendFile(path.join(__dirname,'public','1.jpg'))})

app.get('/hbs', (req, res)=>{
    res.render('index', {
        title : "Hy im crying",
        caption: 'crying'
    })
})

module.exports = app;
// app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))