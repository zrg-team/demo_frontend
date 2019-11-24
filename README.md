# About

Project for building front page base on [nextjs](https://nextjs.org/)

We focus on:
 + Server side render, better for SEO
 + Same source structure with admin application
 + Easy to develop and expand
 + Easy to handle error and finding problems
 + Worked properly event no-network
 + Enhance user experience by cached user data
 + etc

## Structure

public: base html, logo

pages: frontend page
src: source code
 + assets: assets used by website, like image, json, etc
 + common: common component and feature which can reuse by another module
 + configs: configs server, contract, etc ,...
 + modules: website make up by a lot of module: user, home, etc. It make simpler to develop and easier finding problems.
 

## Common Features

+ Route system: handle application route and support page change event
+ Persist system: user data like user, etc will be cached ( make sure app can work event no-network and enhance user experience )
+ State management
+ Support authentication fetch, JWT