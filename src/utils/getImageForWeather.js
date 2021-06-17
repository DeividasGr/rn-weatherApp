import ClearWeather from '../assets/clear.png';
import HailWeather from '../assets/hail.png';
import HeavyCloudWeather from '../assets/heavy-cloud.png';
import LightCloudWeather from '../assets/light-cloud.png';
import HeavyRainWeather from '../assets/heavy-rain.png';
import LightRainWeather from '../assets/light-rain.png';
import ShowersWeather from '../assets/showers.png';
import SleetWeather from '../assets/sleet.png';
import SnowWeather from '../assets/snow.png';
import ThunderWeather from '../assets/thunder.png';

const images = {
  Clear: ClearWeather,
  Hail: HailWeather,
  'Heavy Cloud': HeavyCloudWeather,
  'Light Cloud': LightCloudWeather,
  'Heavy Rain': HeavyRainWeather,
  'Light Rain': LightRainWeather,
  Showers: ShowersWeather,
  Sleet: SleetWeather,
  Snow: SnowWeather,
  Thunder: ThunderWeather,
};

export default weather => images[weather];
