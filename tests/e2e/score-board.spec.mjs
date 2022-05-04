import {test, expect} from '@playwright/test';

test.describe.parallel('scoreboards test', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://localhost:8080/score-board/');
    })
    test('scoreboard special', async ({page, context}) => {
        //1-6 scores
        for (let i = 1; i <= 6; i++) {
            await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${i}) td:nth-child(1) div div`))
                .toHaveClass(/border-blue-cell/)
        }
        //7-8
        for (let i = 1; i <= 2; i++) {
            await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${i}) td:nth-child(2) div div`))
                .toHaveClass(/border-green-cell/)
        }
        for (let i = 3; i <= 6; i++) {
            await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${i}) td:nth-child(2) div`)).toBeEmpty()
        }
        //9-11
        for (let i = 1; i <= 3; i++) {
            await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${i}) td:nth-child(3) div div`))
                .toHaveClass(/border-red-cell/)
        }
        for (let i = 4; i <= 6; i++) {
            await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${i}) td:nth-child(3) div`)).toBeEmpty()
        }
        //12-14
        for (let i = 1; i <= 3; i++) {
            await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${i}) td:nth-child(4) div div`))
                .toHaveClass(/border-blue-cell/)
        }
        for (let i = 4; i <= 6; i++) {
            await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${i}) td:nth-child(4) div`)).toBeEmpty()
        }
        //14-15
        await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${1}) td:nth-child(5) div div`))
            .toHaveClass(/border-red-cell/)
        for (let i = 2; i <= 6; i++) {
            await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${i}) td:nth-child(5) div`)).toBeEmpty()
        }
        //15-16
        await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${1}) td:nth-child(6) div div`))
            .toHaveClass(/border-green-cell/)
        for (let i = 2; i <= 6; i++) {
            await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${i}) td:nth-child(6) div`)).toBeEmpty()
        }
        for (let i = 7; i <= 18; i++) {
            for (let j = 1; j <= 6; j++) {
                await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${j}) td:nth-child(${i}) div`)).toBeEmpty()
            }
        }
        await context.close()
    });
    test('scoreboard basic', async ({page, context}) => {
        //1-6 scores

        for (let i = 1; i <= 6; i++) {
            await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${i}) td:nth-child(1) div div`))
                .toHaveText('P')
            await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${i}) td:nth-child(1) div div`))
                .toHaveClass(/bg-blue-700/)
        }
        //7-8
        for (let i = 1; i <= 2; i++) {
            await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${i}) td:nth-child(2) div div`))
                .toHaveText('T')
            await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${i}) td:nth-child(2) div div`))
                .toHaveClass(/bg-green-700/)
        }
        //9-11
        for (let i = 3; i <= 5; i++) {
            await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${i}) td:nth-child(2) div div`))
                .toHaveText('B')
            await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${i}) td:nth-child(2) div div`))
                .toHaveClass(/bg-red-700/)
        }
        //12
        await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${6}) td:nth-child(2) div div`))
            .toHaveText('P')
        await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${6}) td:nth-child(2) div div`))
            .toHaveClass(/bg-blue-700/)
        //13-14
        for (let i = 1; i <= 2; i++) {
            await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${i}) td:nth-child(3) div div`))
                .toHaveText('P')
            await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${i}) td:nth-child(3) div div`))
                .toHaveClass(/bg-blue-700/)
        }
        //15
        await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${3}) td:nth-child(3) div div`))
            .toHaveText('B')
        await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${3}) td:nth-child(3) div div`))
            .toHaveClass(/bg-red-700/)
        //16
        await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${4}) td:nth-child(3) div div`))
            .toHaveText('T')
        await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${4}) td:nth-child(3) div div`))
            .toHaveClass(/bg-green-700/)

        for (let i = 5; i <= 6; i++) {
            await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${i}) td:nth-child(3) div div`)).toBeEmpty()
        }
        for (let i = 4; i <= 18; i++) {
            for (let j = 1; j <= 6; j++) {
                await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${j}) td:nth-child(${i}) div div`)).toBeEmpty()
            }
        }
        await context.close()

    });
    test('info scoreboard', async ({page, context}) => {
        await expect(page.locator(`[data-test="title-BANKER"] .title`)).toHaveText('4')
        await expect(page.locator(`[data-test="title-PLAYER"] .title`)).toHaveText('9')
        await expect(page.locator(`[data-test="title-TIE"] .title`)).toHaveText('3')
        await expect(page.locator(`[data-test="title-TOTAL"] .title`)).toHaveText('16')
        await context.close()

    })

    test('add score', async ({page, context}) => {
        //add  6 BANKER WIN
        for (let i = 1; i <= 6; i++) {
            await page.locator(`[data-test="btn-BANKER"]`).click()
        }
        for (let i = 1; i <= 6; i++) {
            await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${i}) td:nth-child(7) div div`))
                .toHaveClass(/border-red-cell/)
        }
        for (let i = 5; i <= 6; i++) {
            await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${i}) td:nth-child(3) div div`))
                .toHaveText('B')
            await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${i}) td:nth-child(3) div div`))
                .toHaveClass(/bg-red-700/)
        }
        for (let i = 1; i <= 4; i++) {
            await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${i}) td:nth-child(4) div div`))
                .toHaveText('B')
            await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${i}) td:nth-child(4) div div`))
                .toHaveClass(/bg-red-700/)
        }
        await expect(page.locator(`[data-test="title-BANKER"] .title`)).toHaveText('10')

        // add 4 BANKER WIN
        for (let i = 1; i <= 4; i++) {
            await page.locator(`[data-test="btn-BANKER"]`).click()
        }
        for (let i = 8; i <= 11; i++) {
            await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${6}) td:nth-child(${i}) div div`))
                .toHaveClass(/border-red-cell/)
        }
        // add 6 PLAYER WIN
        for (let i = 1; i <= 6; i++) {
            await page.locator(`[data-test="btn-PLAYER"]`).click()
        }
        for (let i = 1; i <= 5; i++) {
            await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${i}) td:nth-child(${8}) div div`))
                .toHaveClass(/border-blue-cell/)
        }
        await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${5}) td:nth-child(${9}) div div`))
            .toHaveClass(/border-blue-cell/)
        await expect(page.locator(`[data-test="title-PLAYER"] .title`)).toHaveText('15')
        // add 5 TIE
        for (let i = 1; i <= 5; i++) {
            await page.locator(`[data-test="btn-TIE"]`).click()
        }
        for (let i = 1; i <= 4; i++) {
            await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${i}) td:nth-child(${9}) div div`))
                .toHaveClass(/border-green-cell/)
        }
        await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${4}) td:nth-child(${10}) div div`))
            .toHaveClass(/border-green-cell/)
        await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${5}) td:nth-child(${10}) div `)).toBeEmpty()
        await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${6}) td:nth-child(${10}) div div`))
            .toHaveClass(/border-red-cell/)

        // add 10 red
        for (let i = 1; i <= 10; i++) {
            await page.locator(`[data-test="btn-BANKER"]`).click()
        }
        for (let i = 1; i <= 3; i++) {
            await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${i}) td:nth-child(${10}) div div`))
                .toHaveClass(/border-red-cell/)
        }
        for (let i = 1; i <= 2; i++) {
            await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${i}) td:nth-child(${11}) div `)).toBeEmpty()
        }

        for (let i = 10; i <= 17; i++) {
            await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${3}) td:nth-child(${i}) div div`))
                .toHaveClass(/border-red-cell/)
        }
        await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${4}) td:nth-child(${11}) div `)).toBeEmpty()
        await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${5}) td:nth-child(${10}) div `)).toBeEmpty()
        await expect(page.locator(`[data-test="title-BANKER"] .title`)).toHaveText('24')
        await expect(page.locator(`[data-test="title-PLAYER"] .title`)).toHaveText('15')
        await expect(page.locator(`[data-test="title-TIE"] .title`)).toHaveText('8')
        await expect(page.locator(`[data-test="title-TOTAL"] .title`)).toHaveText('47')


        await page.locator(`[data-test="btn-RESET"]`).click()

        for (let i = 1; i <= 18; i++) {
            for (let j = 1; j <= 6; j++) {
                await expect(page.locator(`[data-test="special-table"] >> tr:nth-child(${j}) td:nth-child(${i}) div`)).toBeEmpty()
            }
        }
        for (let i = 1; i <= 18; i++) {
            for (let j = 1; j <= 6; j++) {
                await expect(page.locator(`[data-test="basic-table"] >> tr:nth-child(${j}) td:nth-child(${i}) div div`)).toBeEmpty()
            }
        }
        await expect(page.locator(`[data-test="title-BANKER"] .title`)).toHaveText('0')
        await expect(page.locator(`[data-test="title-PLAYER"] .title`)).toHaveText('0')
        await expect(page.locator(`[data-test="title-TIE"] .title`)).toHaveText('0')
        await expect(page.locator(`[data-test="title-TOTAL"] .title`)).toHaveText('0')
        await context.close()

    })

});