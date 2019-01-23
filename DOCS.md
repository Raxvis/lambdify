## Functions

<dl>
<dt><a href="#binary">binary(body, type, options)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates an Binary AWS Lambda proxy response payload
Lambda Proxy - <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html">https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html</a></p>
</dd>
<dt><a href="#event">event(originalEvent, body, overrides)</a> ⇒ <code>Object</code></dt>
<dd><p>Builds a lambda proxy event and allows you to supply a body and / or overrides.  Useful for calling a second lambda function</p>
</dd>
<dt><a href="#html">html(body, options)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates an HTML AWS Lambda proxy response payload
Lambda Proxy - <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html">https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html</a></p>
</dd>
<dt><a href="#invoke">invoke(event, handler)</a> ⇒ <code>Object</code></dt>
<dd><p>Invokes a local lambda function simulated as a lambda proxy request</p>
</dd>
<dt><a href="#json">json(body, options)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates an JSON AWS Lambda proxy response payload
Lambda Proxy - <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html">https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html</a></p>
</dd>
<dt><a href="#parsePayload">parsePayload(payload)</a> ⇒ <code>Object</code></dt>
<dd><p>Parses a payload from a lambdify response</p>
</dd>
<dt><a href="#payload">payload(body, body)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates a lambdify payload for standard responses</p>
</dd>
<dt><a href="#redirect">redirect(url, statusCode)</a> ⇒ <code>Object</code></dt>
<dd><p>Redirect to a url
Lambda Proxy - <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html">https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html</a></p>
</dd>
<dt><a href="#request">request(event, context)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates a lambdify request object to ensure that as the AWS Lambda proxy event changes, the request will stay the same</p>
</dd>
<dt><a href="#response">response(body, type, options)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates an AWS Lambda proxy response payload
Lambda Proxy - <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html">https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html</a></p>
</dd>
<dt><a href="#run">run(event, context, fn)</a> ⇒ <code>Object</code></dt>
<dd><p>Processes the AWS Lambda Proxy event, executes a function, and returns a standard Lambdify response
Lambda Proxy - <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html">https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html</a></p>
</dd>
<dt><a href="#xml">xml(body, options)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates an XML AWS Lambda proxy response payload
Lambda Proxy - <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html">https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html</a></p>
</dd>
</dl>

<a name="binary"></a>

## binary(body, type, options) ⇒ <code>Object</code>
Creates an Binary AWS Lambda proxy response payload
Lambda Proxy - https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html

**Kind**: global function  
**Returns**: <code>Object</code> - Lambda Proxy response object  
**Category**: runner  
**Since**: 3.1.0  

| Param | Type | Description |
| --- | --- | --- |
| body | <code>Object</code> | The response being sent back to the client |
| type | <code>String</code> | The Content-Type being sent back |
| options | <code>Object</code> | Any options that should be merged into the final response |

**Example**  
```js
import { binary } from 'lambdify';

exports.handler = (event, context) => context.succeed(
	binary(fs.readFileSync('image.png').toString('base64'), 'image/png')
);
```
<a name="event"></a>

## event(originalEvent, body, overrides) ⇒ <code>Object</code>
Builds a lambda proxy event and allows you to supply a body and / or overrides.  Useful for calling a second lambda function

**Kind**: global function  
**Returns**: <code>Object</code> - Returns the new event  
**Category**: runner  
**Since**: 3.1.0  

| Param | Type | Description |
| --- | --- | --- |
| originalEvent | <code>Object</code> | The original lambda proxy event. |
| body | <code>Object</code> \| <code>Array</code> \| <code>String</code> | The body to set into the event. |
| overrides | <code>Object</code> | The overrides object allows you to selectively override the initial event |

**Example**  
```js
import { event } from 'lambdify';

const initialEvent = { path: '/foo' };

event(initialEvent, { foo: 'bar' });
// => { path: '/foo', body: '{"foo":"bar"}' }

event(initialEvent, {}, { path: '/bar' });
// => { path: '/bar' }

event(initialEvent, {}, { queryStringParameters: { baz: 'bar' } });
// => { path: '/bar', queryStringParameters: { baz: 'bar' } }
```
<a name="html"></a>

## html(body, options) ⇒ <code>Object</code>
Creates an HTML AWS Lambda proxy response payload
Lambda Proxy - https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html

**Kind**: global function  
**Returns**: <code>Object</code> - Lambda Proxy response object  
**Category**: runner  
**Since**: 3.1.0  

| Param | Type | Description |
| --- | --- | --- |
| body | <code>Object</code> | The response being sent back to the client |
| options | <code>Object</code> | Any options that should be merged into the final response |

**Example**  
```js
import { html } from 'lambdify';

exports.handler = (event, context) => context.succeed(
	html('<h1>Hello World</h1>')
);
```
<a name="invoke"></a>

## invoke(event, handler) ⇒ <code>Object</code>
Invokes a local lambda function simulated as a lambda proxy request

**Kind**: global function  
**Returns**: <code>Object</code> - Returns a response from the invoked lambda function.  
**Category**: runner  
**Since**: 3.1.0  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | The lambda proxy event. |
| handler | <code>String</code> \| <code>function</code> | The file path to the handler. (use dot notation for specific module) |

**Example**  
```js
import { invoke } from 'lambdify';

const event = { path: '/foo' };

await invoke(event, './index.handler');
// => { statusCode: 200, body: '' }


const handler = (event, context) => context.succeed('bar');
await invoke(event, handler);
// => 'bar'
```
<a name="json"></a>

## json(body, options) ⇒ <code>Object</code>
Creates an JSON AWS Lambda proxy response payload
Lambda Proxy - https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html

**Kind**: global function  
**Returns**: <code>Object</code> - Lambda Proxy response object  
**Category**: runner  
**Since**: 3.1.0  

| Param | Type | Description |
| --- | --- | --- |
| body | <code>Object</code> | The response being sent back to the client |
| options | <code>Object</code> | Any options that should be merged into the final response |

**Example**  
```js
import { json } from 'lambdify';

exports.handler = (event, context) => context.succeed(
	json({ foo: 'bar' })
);
```
<a name="parsePayload"></a>

## parsePayload(payload) ⇒ <code>Object</code>
Parses a payload from a lambdify response

**Kind**: global function  
**Returns**: <code>Object</code> - This is the payload response being returned by the lambda function  
**Category**: runner  
**Since**: 3.1.0  

| Param | Type | Description |
| --- | --- | --- |
| payload | <code>Object</code> | The lambda payload (generated by lambdify-runner). |

**Example**  
```js
// Lambda Function
import { runner } from 'lambdify';

exports.handler = (event, context) => runner({ foo: 'bar' });


// Client Side Code
const response = await fetch('/lambda-function');

parsePayload(repsonse);
// => { foo: 'bar' }
```
<a name="payload"></a>

## payload(body, body) ⇒ <code>Object</code>
Creates a lambdify payload for standard responses

**Kind**: global function  
**Returns**: <code>Object</code> - Lambdify response object  
**Category**: runner  
**Since**: 3.1.0  

| Param | Type | Description |
| --- | --- | --- |
| body | <code>Object</code> \| <code>Array</code> \| <code>String</code> | The response being sent back to the client |
| body | <code>Error</code> | An error if one occured |

**Example**  
```js
import { payload } from 'lambdify';

exports.handler = (event, context) => context.succeed(payload({ foo: 'bar' }));
```
<a name="redirect"></a>

## redirect(url, statusCode) ⇒ <code>Object</code>
Redirect to a url
Lambda Proxy - https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html

**Kind**: global function  
**Returns**: <code>Object</code> - Lambda Proxy response object  
**Category**: runner  
**Since**: 3.1.0  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | The url to be redirected too |
| statusCode | <code>Tnt</code> | The status code sent in the response which defaults to 302 |

**Example**  
```js
import { redirect } from 'lambdify';

exports.handler = (event, context) => context.succeed(
	redirect('https://google.com')
);
```
<a name="request"></a>

## request(event, context) ⇒ <code>Object</code>
Creates a lambdify request object to ensure that as the AWS Lambda proxy event changes, the request will stay the same

**Kind**: global function  
**Returns**: <code>Object</code> - Lambdify request object  
**Category**: runner  
**Since**: 3.1.0  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | The AWS Lambda event object |
| context | <code>Object</code> | The AWS Lambda context object |

**Example**  
```js
import { request } from 'lambdify';

const intialEvent = { queryStringParameters: { foo : 'bar' } };

request(intialEvent);
// => { queryParams: { foo: 'bar' } }
```
<a name="response"></a>

## response(body, type, options) ⇒ <code>Object</code>
Creates an AWS Lambda proxy response payload
Lambda Proxy - https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html

**Kind**: global function  
**Returns**: <code>Object</code> - Lambda Proxy response object  
**Category**: runner  
**Since**: 3.1.0  

| Param | Type | Description |
| --- | --- | --- |
| body | <code>Object</code> | The response being sent back to the client |
| type | <code>String</code> | The Content-Type being sent back |
| options | <code>Object</code> | Any options that should be merged into the final response |

**Example**  
```js
import { response } from 'lambdify';

exports.handler = (event, context) => context.succeed(
	response(
		JSON.stringify({ foo: 'bar' })
	)
);
```
<a name="run"></a>

## run(event, context, fn) ⇒ <code>Object</code>
Processes the AWS Lambda Proxy event, executes a function, and returns a standard Lambdify response
Lambda Proxy - https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html

**Kind**: global function  
**Returns**: <code>Object</code> - Lambda Proxy response object  
**Category**: runner  
**Since**: 3.1.0  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Object</code> | The AWS Lambda Event |
| context | <code>Object</code> | The AWS Lambda Context |
| fn | <code>function</code> | The function you wish to execute |

**Example**  
```js
import { run } from 'lambdify';

const myFN = (request) => {
	if (request.method === 'POST') {
		return { foo: 'bar' };
	}

	return { foo: 'baz' };
}

exports.handler = (event, context) => run(event, context, myFN);
```
<a name="xml"></a>

## xml(body, options) ⇒ <code>Object</code>
Creates an XML AWS Lambda proxy response payload
Lambda Proxy - https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html

**Kind**: global function  
**Returns**: <code>Object</code> - Lambda Proxy response object  
**Category**: runner  
**Since**: 3.1.0  

| Param | Type | Description |
| --- | --- | --- |
| body | <code>Object</code> | The response being sent back to the client |
| options | <code>Object</code> | Any options that should be merged into the final response |

**Example**  
```js
import { xml } from 'lambdify';

exports.handler = (event, context) => context.succeed(
	xml('<response>Hello World</response>')
);
```
