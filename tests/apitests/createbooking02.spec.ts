import { test, expect } from "@playwright/test";
import { fa, faker } from "@faker-js/faker";
import { DateTime } from 'luxon';
/**
 * test: create booking
 * request type: Post
 * Request body: random dynamic from faker library
 */

test('create booking using static request body', async ({ request }) => {

    //random data generation using faker library
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const totalprice = faker.number.int({ min: 500, max: 10000 });
    const checkinDate = DateTime.now().toFormat("yyyy-MM-dd");
    const checkoutdate = DateTime.now().plus({ day: 5 }).toFormat('yyyy-MM-dd');
    const additionalneeds = "Egg rice";
    const depositpaid = faker.datatype.boolean();

    //requestBody generation

    const requestBody = {
        "firstname": firstname,
        "lastname": lastname,
        "totalprice": totalprice,
        "depositpaid": depositpaid,
        "bookingdates": {
            "checkin": checkinDate,
            "checkout": checkoutdate
        },
        "additionalneeds": additionalneeds
    }


    const response = await request.post("/booking", { data: requestBody });
    const responseBody = await response.json();
    console.log(responseBody);
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