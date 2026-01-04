import { test, expect } from "@playwright/test";
import fs, { read } from "fs";
/*

1.create booking
2.get booking
3.generate token
4.update booking
5.delete booking
*/

//readfile function
function readJsonFile(filepath: string) {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
}
test('delete booking id using patch request', async ({ request }) => {

    //create booking
    const postRequestBody = readJsonFile("../PLAYWRIGHTAUTOMATIONFRAMEWORK/testdata/createbooking.json");
    const postResponse = await request.post('/booking', { data: postRequestBody });
    const postResponseBody = await postResponse.json();
    console.log(postResponseBody);
    const bookingID = postResponseBody.bookingid;
    console.log("Booking successfully created");
    console.log("Booking Id is ------>", bookingID);

    //Get booking details
    const getResponse = await request.get(`/booking/${bookingID}`);
    const getResponseBody = await getResponse.json();
    console.log("Booking details fetched successfully ");
    console.log(getResponseBody);
    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.status()).toBe(200);

    //creating token

    //Generate token to update booking
    const tokenRequestBody = readJsonFile("../PLAYWRIGHTAUTOMATIONFRAMEWORK/testdata/generatetoken.json");
    const tokenResponse = await request.post("/auth", { data: tokenRequestBody });
    const tokenresponsebody = await tokenResponse.json();
    const token = await tokenresponsebody.token;
    console.log("Token generated successfully ");
    console.log("Generated token is : ", token);

    //update booking details
    const updateRequestBody = readJsonFile("../PLAYWRIGHTAUTOMATIONFRAMEWORK/testdata/Updatebooking.json");
    const updateResponse = await request.put(`/booking/${bookingID}`,
        {
            headers: { "Cookie": `token=${token}` },
            data: updateRequestBody
        })
    const updateResponseBody = await updateResponse.json();
    console.log(updateResponseBody);
    console.log("Updated successfully");

    //delete  booking 
    const deleteResponse = await request.delete(`/booking/${bookingID}`,
        {
            headers: { "Cookie": `token=${token}` }
        }
    )
    expect(deleteResponse.statusText()).toBe('Created');
    expect(deleteResponse.status()).toBe(201);
    console.log('Deleted booking successfully')

});

