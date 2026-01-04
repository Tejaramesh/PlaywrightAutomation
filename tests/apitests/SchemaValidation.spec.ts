import { test, expect } from "@playwright/test";
import Ajv from 'ajv';

test('validate json schema', async ({ request }) => {

    const response = await request.get('https://mocktarget.apigee.net/json');
    const responseBody = await response.json();
    console.log(responseBody);
    const schema = {
        "type": "object",
        "properties": {
            "firstName": {
                "type": "string"
            },
            "lastName": {
                "type": "string"
            },
            "city": {
                "type": "string"
            },
            "state": {
                "type": "string"
            }
        },
        "required": ["firstName", "lastName", "city", "state"],
        "additionalProperties": false
    }

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const isvalid = validate(responseBody);
    expect(isvalid).toBeTruthy();


})