package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lorddeathunter/mowoji/src/utils"
)

func main() {
	app := fiber.New()

	app.Get("/emojis", func(c *fiber.Ctx) error {
		files, err := utils.GetFiles("../emojis")

		if err != nil {
			return c.Status(500).SendString(err.Error())
		}

		var fileString = ""
		for _, file := range files {
			fileString += file + "\n"
		}

		return c.SendString(fileString)
	})

	app.Listen(":3000")
}
