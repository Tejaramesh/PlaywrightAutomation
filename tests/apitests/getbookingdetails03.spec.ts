import { test, expect } from "@playwright/test";

test('get booking details by id', async ({ request }) => {
    const bookingId = 2362;
    const response = await request.get(`/booking/${bookingId}`);
    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

})


test.only('get booking details by first name and last name as query param', async ({ request }) => {
    const firstname = "Teja";
    const lastname = "Ramesh";
    const response = await request.get("/booking", {
        params:
        {
            firstname,
            lastname
        }
    });
    //parse the response and print
    const responseBody = await response.json();
    console.log(responseBody);
    //add assertions
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    //check response not to be empty
    expect(responseBody.length).toBeGreaterThan(0);

    for(let item of responseBody){
        expect(item).toHaveProperty('bookingid');
        expect(typeof item.bookingid).toBe('number');
        expect(item.bookingid).toBeGreaterThan(0);
    }

});