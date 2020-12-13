/**
 * klasa reprezentujaca kule
 */
class Kula {
    private id: number;
    private masa: number;
    /**
     * @param {number} id - id kuli (Int)
     * @param {number} masa - masa kuli (0 lub 1)
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
     * @return {number} - val kuli (Int)
     */
    public getMass(): number {
	return this.masa;
    }
}
export {Kula};
