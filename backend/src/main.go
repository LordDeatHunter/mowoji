package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/lorddeathunter/mowoji/src/utils"
)

func main() {
	app := fiber.New()

	app.Get("/emojis", func(c *fiber.Ctx) error {
		files, err := utils.GetFiles("emojis")

		if err != nil {
			return c.Status(500).SendString(err.Error())
		}

		json := utils.ConvertToJSON(files)

		c.Set("Content-Type", "application/json")

		return c.Status(200).JSON(json)
	})

	app.Get("/emojis.zip", func(c *fiber.Ctx) error {
		files, err := utils.GetFiles("emojis")

		if err != nil {
			return c.Status(500).SendString(err.Error())
		}

		zipBuffer, err := utils.ZipFiles(files, "emojis.zip")

		if err != nil {
			return c.Status(500).SendString(err.Error())
		}

		c.Set("Content-Type", "application/zip")
		c.Set("Content-Disposition", "attachment; filename=emojis.zip")

		return c.Status(200).Send(zipBuffer.Bytes())
	})

	app.Listen(":6969")
}
