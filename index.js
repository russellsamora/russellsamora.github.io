const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data.json'))


const projects = data.projects.map(d => {
	const { id, title, description, url, video } = d
	// < img alt = '${id}' src = 'img/${id}.jpg' loading = lazy /></a>
	return `
		<div class='project'>
			<p><a href='${url}'>${title}</a></p>
		</div>
	`
}).join('\n')

const openSource = data.openSource.map(d => {
	const { id, title, description, url } = d
	return `
		<div class='open-source'>
			<p class='open-source__description'><a href='${url}'>${title}</a> ${description}</p>
		</div>
	`
}).join('\n')

const template = fs.readFileSync('index.template', 'utf8')
const style = fs.readFileSync('css/main.css', 'utf8')

const html = template
	.replace('<!-- projects -->', projects)
	.replace('<!-- open-source -->', openSource)
	.replace('/* style */', style)

fs.writeFileSync('index.html', html)
