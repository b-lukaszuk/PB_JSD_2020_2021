/**
 * klasa reprezentujaca wage
 * posiada met wazaca + licznik il. wazen (i jego getter)
 */
class Waga {
    /**
     * @param {Array<Number>} kule - tab liczb 1x2, reszta jedynki
     * @return {Number} suma elementow tej tablicy
     */
    private lUzyc: number;
    private kule: Array<Object>;

    public constructor(kule: Array<number>) {
	this.lUzyc = 0;
	this.kule = this.tabDoTabObj(kule);
    }

    /**
     * fn. pom. - zamienia tablice Intow na tablice obiektow
     * postaci [{id_z_tab: wart_z_tab}, {id_z_tab: wart_z_tab}]
     * @param {Array<Number>} tab - tabela liczb
     * @return {Array<Object>} - tab obiektow postaci {id: num}
     */
    private tabDoTabObj(tab: Array<number>): Array<Object> {
	let tabObj: Array<Object> = [];
	for (let i = 0; i < tab.length; i++) {
	    tabObj.push({i: tab[i]}); // np. {"0": 1}
	}
	return tabObj;
    }
    /**
     * fn. pom. - sumuje elt-y tab postaci [{"0": 1}, {"1": 1}, {"1": 2}, ...]
     * @param {Array<Object>} tab - tab [{"id": num}, {"id2": num2}, ...]
     * @return {Number} suma elementow tej tablicy
     */
    private sumObj(tab: Array<Object>): number {
	let suma: number = 0;
	for (let i = 0; i < tab.length; i++) {
	    for(let key in tab[i]) {
		suma += tab[i][key];
	    }
	}
	return suma;
    }
    /**
     * imituje wazenie 2 zestawow kul (wagi, trzyma counter liczby wazen)
     * @param {Array<Number>} tab1 - [{id: num}, {id2: num2}] do zwazenia
     * @param {Array<Number>} tab2 - [{id: num}, {id2: num2}] do zwazenia
     * @return {Number} [-1, 0, 1] - dla tab1 vs. tab2 (lt, eq, gt)
     */
    public zwazKule(tab1: Array<Object>, tab2: Array<Object>): number {
	this.lUzyc++;
	let sT1: number = this.sumObj(tab1);
	let sT2: number = this.sumObj(tab2);
	if (sT1 < sT2) {
	    return -1;
	} else if (sT1 === sT2) {
	    return 0;
	} else {
	    return 1;
	}
    }

    public getKule() {
	return this.kule;
    }
    public getLuzyc() {
	return this.lUzyc;
    }
}


export {Waga};
