import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';

import echarts from 'echarts/lib/echarts';

export default dom => echarts.init(dom);

let dispose = chart => {
    if (chart) {
        chart.clear();
        if (!chart.isDisposed())
            chart.dispose();
        chart=null;
    }
}
let setOption = (chart, options) => {
    let newOptions=Object.assign({
        color:['#61DA00','#00CCFF','#afa9fe','#fe8080'],
        animation:false,
        textStyle:{
          
            fontSize:14*window.DPR
        }
    },options)
    chart && chart.setOption(newOptions);
}
export { setOption,dispose };