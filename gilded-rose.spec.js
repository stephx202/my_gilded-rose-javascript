import { expect, describe, it } from "vitest";
import {
    Item,
    items,
    updateQuality,
    Cheese,
    Legendary,
    ConcertTickets,
    Conjured
} from "./gilded-rose.js";

describe("updateQuality", () => {
    it("never has a quality less than 0", () => {
        for (let i = 0; i < 50; i++) {
            items.push(new Item(`basic${i}`, 30, 30));
        }
        for (let i = 0; i < 100; i++) {
            updateQuality();
            quality_never_negative();
        }
    });

    it("never has a quality over 50", () => {
        for (let i = 0; i < 50; i++) {
            items.push(new Item(`basic${i}`, 30, 30));
        }
        for (let i = 0; i < 100; i++) {
            updateQuality();
            quality_never_over_50();
        }
    });

    it("reduces quality and sellIn of basic items by 1", () => {
        const testItem = new Item("basic", 5, 3);
        items.push(testItem);

        updateQuality();

        expect(testItem.quality).toBe(2);
        expect(testItem.sellIn).toBe(4);
    });

    it("increases quality of aged brie over time", () => {
        // const aged_brie = items.filter(i => i.name == "Aged Brie")[0];
        const aged_brie = new Cheese("Aged Brie", 15, 20);
        items.push(aged_brie);

        const old_value = aged_brie.quality;
        updateQuality();
        const new_value = aged_brie.quality;

        expect(old_value).toBeLessThanOrEqual(new_value);
    });

    it("backstage passes increase then drop", () => {
        const tix = new ConcertTickets("Backstage passes to a TAFKAL80ETC concert", 15, 10);
        items.push(tix);
        for (let i = 5; i > 0; i--) {
            updateQuality();
        }
        expect(tix.sellIn).toBe(10);
        for (let i = 5; i > 0; i--) {
            let old_value = tix.quality;
            updateQuality();
            let new_value = tix.quality;
            expect(new_value).toBe(old_value + 2);
        }
        for (let i = 5; i > 0; i--) {
            let old_value = tix.quality;
            updateQuality();
            let new_value = tix.quality;
            expect(new_value).toBe(old_value + 3);
        }

        updateQuality();

        expect(tix.quality).toBe(0);
    });

    it("conjured items degrade twice as fast", () => {
        const item = new Conjured("Conjured Mana Cake", 15, 10);
        items.push(item);

        const old_value = item.quality;
        updateQuality();
        const new_value = item.quality;

        expect(new_value).toBe(old_value - 2);
    });
});

function quality_never_negative() {
    for (const item of items) {
        expect(item.quality).toBeGreaterThanOrEqual(0);
    }
}

function quality_never_over_50() {
    for (const item of items) {
        if (item.name === "Sulfuras, Hand of Ragnaros") {
            expect(item.quality).toBe(80);
        } else {
            expect(item.quality).toBeLessThanOrEqual(50);
        }
    }
}