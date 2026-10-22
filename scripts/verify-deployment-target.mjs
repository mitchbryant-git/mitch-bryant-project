import fs from 'node:fs';
const expectedRepo='mitch-bryant-project';
const expectedProject='prj_XXcJjMzyCQqU3jI4JJlNuubQ0DJM';
const linked=fs.existsSync('.vercel/project.json')?JSON.parse(fs.readFileSync('.vercel/project.json','utf8')).projectId:null;
if ((process.env.VERCEL_PROJECT_ID && process.env.VERCEL_PROJECT_ID!==expectedProject)||(linked&&linked!==expectedProject)||(process.env.VERCEL_GIT_REPO_SLUG&&process.env.VERCEL_GIT_REPO_SLUG!==expectedRepo)) throw Error('Deployment target mismatch: root ATN must use mitch-bryant-project repository and project.');
console.log('Root ATN deployment target verified.');
