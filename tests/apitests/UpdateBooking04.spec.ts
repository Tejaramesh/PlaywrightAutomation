import { test, expect } from "@playwright/test";
import fs, { read } from "fs";

//readfile function
function readJsonFile(filepath: string) {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
}
test('Update booking id using put request', async ({ request }) => {

    //create booking
    const requestBody = readJsonFile("../PLAYWRIGHTAUTOMATIONFRAMEWORK/testdata/createbooking.json");
    const createResponse = await request.post('/booking', { data: requestBody });
    const responseBody = await createResponse.json();
    console.log(responseBody);
    const bookingID = responseBody.bookingid;
    console.log("Booking Id is ------>", bookingID);

    //Generate token to update booking
    const tokenRequestBody = readJsonFile("../PLAYWRIGHTAUTOMATIONFRAMEWORK/testdata/generatetoken.json");
    const tokenResponse = await request.post("/auth", { data: tokenRequestBody });
    const tokenresponsebody = await tokenResponse.json();
    const token = await tokenresponsebody.token;
    console.log("Generated token is : ", token);

    //sending update (put) request

    const updateRequestBody = readJsonFile("../PLAYWRIGHTAUTOMATIONFRAMEWORK/testdata/Updatebooking.json");
    const updateResponse = await request.put(`/booking/${bookingID}`,
        {
            headers: { "Cookie": `token=${token}` },
            data: updateRequestBody
        })
    const updateResponseBody = await updateResponse.json();
    console.log(updateResponseBody);

})