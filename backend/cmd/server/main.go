package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lorddeathunter/mowoji/internal/handlers"
)

func main() {
	app := fiber.New()

	app.Get("/emojis", handlers.GetEmojis)
	app.Get("/emojis.zip", handlers.DownloadEmojis)

	err := app.Listen(":6969")
	if err != nil {
		println("Error starting server: " + err.Error())
	}
}
