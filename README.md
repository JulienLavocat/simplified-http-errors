# Usage

1 - Install express-async-errors using `npm i express-async-errors`

2 - Install simplified-http-errors using `npm i simplified-http-errors`

3 - Import `HttpError` class using `const HttpError = require("simplified-http-errors").HttpError;`

3 - Add `require("express-async-errors")` in your main file.

4 - (Optional but recomended) use library's errors handling middleware using `app.use(require("simplified-http-errors").middleware());` (**important**: this import must be done after every`app.use()` calls).

4 - Whenever you need to throw an exception, simply do :

    throw new HttpError("<your error code from possibles errors>", "<error message>", (optional) "<error details>"

With express-async-errors you don't need to have any specific code like wrapping your async functions or use next(error) in order to throw an error from async functions.

# Exemple file

    const  express  =  require("express");
    const  HttpError  =  require("simplified-http-errors").HttpError;
    
    const app = express();
    
    require("express-async-errors");
    
    //Insert others middleware like body-parser or routers
    
    app.use(require("simplified-http-errors").middleware());
    
    app.get("/", async (req, res) => {
	    try {
			const result = await doSomeStuffThatCanFail();
		} catch(err) {
			throw new HttpError("internal", "Something went wrong");
		}
    });
    
    app.get("/missingArguments", (req, res) => {
	    if(!req.query.username)
		    throw new HttpError("invalid-argument", "Missing or invalid username");
    });

    app.listen(80);
