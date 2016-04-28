const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./data.json'))

const videoHTML = video =>
	video ? `<div class='project-video'><a href='#${id}'>*</a></div>` : ''

const projects = data.map(d => {
	const { id, title, description, url, video } = d
	return `
		<div class='project'>
			<div class='project-image'>
				<a href='${url}'><img src='img/${id}.jpg' /></a>
			</div>
			<p class='project-description'><a href='${url}'>${title}</a> ${description}</p>
			${videoHTML(video)}
		</div>
	`
}).join('\n')

const template = fs.readFileSync('index.template', 'utf8')
const style = fs.readFileSync('css/main.css', 'utf8')

const indexWithProjects = template.replace('<!-- projects -->', projects)
const indexWithStyle = indexWithProjects.replace('/* style */', style)

fs.writeFileSync('index.html', indexWithStyle)
