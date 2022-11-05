<template>
	<nav>
		<router-link to="/">Home</router-link> |
		<router-link to="/Sorting">Sorting</router-link>
	</nav>
	<router-view />
</template>

<style>
	@font-face{
		font-family: "Maven Pro";
		src: local("Maven Pro"),
		url(./fonts/MavenPro-VariableFont_wght.ttf) format("truetype");
	}
</style>
