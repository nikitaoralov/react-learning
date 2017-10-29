import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';

var my_news = [
  {
    author: 'Саша Печкин',
    text: 'В четчерг, четвертого числа...',
    bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
    bigText: 'А евро 42!'
  },
  {
    author: 'Гость',
    text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
];
class News extends Component {

  constructor(props) {
    super(props);
    this.state = {counter: 0};
  }

  render() {
    var data = this.props.data;
    var newsTemplate;

    if(data.length > 0) {
      newsTemplate = data.map(function(item, index){
        return (
          <div key={index}>
            <Article data={item} />
          </div>
        )
      })
    } else {
      newsTemplate = <p>К сожалению, новостей нет!</p>
    }

    console.log(newsTemplate);

    return (
      <div className="news">
        {newsTemplate}
        <strong className={'news_count ' + (data.length > 0 ? '':'none') }>Всего новостей: {data.length}</strong>
      </div>
    );
  }
}

News.propTypes = {
  data: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        bigText: PropTypes.string.isRequired
      })
  ).isRequired,
}

// --- добавили test input ---
class TestInput extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  render() {
    return (
      <input 
        type="text" 
        className='test-input' 
        onChange={this.handleChange}
        value={this.state.value} 
      />
    );
  }
}

class Article extends Component {

  constructor(props) {
    super(props);
    this.state = {visible: false};
    this.readMore = this.readMore.bind(this);
  }

  readMore() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    var author = this.props.data.author,
          text = this.props.data.text,
       bigText = this.props.data.bigText,
       visible = this.state.visible;
    return (
      <div className="article">
        <p className="news_author">{author}:</p>
        <p className="news_text">{text}</p>
        <a href="#" 
          onClick={this.readMore}>
          {visible ? 'Скрыть' : 'Показать'}
        </a>
        <p className={'news_big-text ' + (visible ? '':'none')}>{bigText}</p>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h3>Всем привет, я компонент App! Я умею отображать новости.</h3>
      <TestInput /> {/* добавили вывод компонента */}
        <News data={my_news}/>       
      </div>
    );
  }
}

export default App;
