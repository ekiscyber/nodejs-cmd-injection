'use strict';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { spawn } from 'child_process';
import { execFile } from 'child_process';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './'));

var output = '';
var pingoutput = '';

app.get('/', (req, res) => {
	res.render('index', {
		output: null,
		pingoutput: null,
	});
});

app.post('/', (req, res) => {
	const ping = req.body.ping;
	const ping1 = req.body.ping1;
	if (ping) {
		let childProcess = spawn('/bin/ping', ['-c', '3', ping]);

		childProcess.stdout.setEncoding('utf8');
		childProcess.stdout.on('data', function (data) {
			data = data.toString();
			output += data;
		});

		childProcess.stderr.setEncoding('utf8');
		childProcess.stderr.on('data', function (data) {
			data = data.toString();
			output += data;
		});

		childProcess.on('close', function (code) {
			console.log('closing code: ' + code);
			res.render('index', { output: output, pingoutput: null });
		});
	}
	if (ping1) {
		execFile('/bin/ping', ['-c', '3', ping1], function (err, stdout, stderr) {
			pingoutput = stdout + stderr;
			res.render('index', {
				pingoutput: pingoutput,
				output: null,
			});
		});
	}
});

// ping directory: /usr/bin/ping or /usr/bin/ping

app.listen(3000, () => console.log('Listening on Port:3000'));
