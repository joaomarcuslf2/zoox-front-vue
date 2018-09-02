import * as moment from 'moment-timezone';
import 'moment/locale/pt-br';

moment.locale('pt-BR');

export default time => moment(time).tz('America/Sao_Paulo');
