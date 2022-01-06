import ReactDOM from 'react-dom'
import './styles.css'
import App from './App'

const pexelImg = (num, type) => `https://images.pexels.com/photos/${num}/pexels-photo-${num}.${type}?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`;

const images = [
  pexelImg(1719233, 'jpeg'),
  pexelImg(5380611, 'jpeg'),
  pexelImg(5473950, 'jpeg'),
  pexelImg(8108098, 'jpeg'),
  pexelImg(2129796, 'png'),
  pexelImg(8720614, 'jpeg'),
  pexelImg(8108576, 'jpeg'),
  pexelImg(3905161, 'jpeg'),
  pexelImg(4337198, 'jpeg'),
]

ReactDOM.render(<App images={images} />, document.getElementById('root'))
