<template>
	<v-container>
		<v-row class="text-center">
			<v-col cols="12" class="">
				<div class="d-flex justify-center text">
					<label class="text__label" for="input">Возможно это</label>

					<div class="text__input">
						<v-text-field
							id="input"
							solo
							label="Динозавр"
							v-model="word"
							append-icon="mdi-send"
							@click:append="sendWord"
							:messages="message"
						>
						</v-text-field>
					</div>
				</div>
				<div class="d-flex justify-center text"></div>
			</v-col>
			<List :items="items"></List>
		</v-row>
	</v-container>
</template>

<script src="./hello-world.js">
</script>
<style lang="scss">
@import "./hello-world.scss";
</style>
