import { test, expect } from "@playwright/test";
import fs, { read } from "fs";

//readfile function
function readJsonFile(filepath: string) {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
}
test('Partial Update booking id using patch request', async ({ request }) => {

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

    //sending update (partial) request

    const partialUpdateRequestBody = readJsonFile("../PLAYWRIGHTAUTOMATIONFRAMEWORK/testdata/partialupdate.json");
    const updateResponse = await request.patch(`/booking/${bookingID}`,
        {
            headers: { "Cookie": `token=${token}` },
            data: partialUpdateRequestBody
        })
    const partialUpdateResponseBody = await updateResponse.json();
    console.log(partialUpdateResponseBody);

})