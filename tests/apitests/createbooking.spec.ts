import { test, expect } from "@playwright/test";
import fs from "fs";

test('create booking using static request body', async ({ request }) => {

    const jsonPath="../PLAYWRIGHTAUTOMATIONFRAMEWORK/testdata/createbooking.json";
    const requestBody=JSON.parse(fs.readFileSync(jsonPath,'utf-8'));


    
    const response = await request.post("/booking", { data: requestBody });
    const responseBody = await response.json();
    //validate status
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    //validate respnse body only Attributes
    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody).toHaveProperty('booking');
    expect(responseBody).toHaveProperty('booking.additionalneeds');
    //validate booking details:
    const booking = await responseBody.booking;

    expect(booking).toMatchObject({
        "firstname": requestBody.firstname,
        "lastname": requestBody.lastname,
        "totalprice": requestBody.totalprice,
        "depositpaid": requestBody.depositpaid,
        "additionalneeds": requestBody.additionalneeds
    });

    expect(booking.bookingdates).toMatchObject({
        "checkin": requestBody.bookingdates.checkin,
        "checkout": requestBody.bookingdates.checkout
    })







})