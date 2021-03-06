/**
 * klasa reprezentujaca kule
 */
class Kula {
    private id: number;
    private masa: number;
    /**
     * @param {number} id - id kuli (Int, >= 0)
     * @param {number} masa - masa kuli (1|2)
     */
    public constructor(id: number, masa: number) {
	this.id = id;
	this.masa = masa;
    }

    /**
     * zwraca id kuli
     * @return {number} - id kuli (Int)
     */
    public getId(): number {
	return this.id;
    }

    /**
     * zwraca wage kuli
     * @return {number} - masa kuli (Int, 1 lub 2)
     */
    public getMass(): number {
	return this.masa;
    }
}
export {Kula};
