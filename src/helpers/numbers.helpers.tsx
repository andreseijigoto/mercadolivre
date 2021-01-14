class NumbersHelper {
  setSeparator(par:number) {
    let num = par.toFixed(2).toString().split('.');
    num[0] = num[0].replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    return num.join(',');
  }
}

export default NumbersHelper;