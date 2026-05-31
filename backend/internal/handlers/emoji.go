package handlers

import (
	"os"
	"path/filepath"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/lorddeathunter/mowoji/internal/utils"
)

var allowedImageExts = map[string]string{
	".png":  "image/png",
	".jpg":  "image/jpeg",
	".jpeg": "image/jpeg",
	".gif":  "image/gif",
	".webp": "image/webp",
}

func GetEmoji(c *fiber.Ctx) error {
	filename := c.Params("filename")

	if strings.ContainsAny(filename, `/\`) || strings.Contains(filename, "..") {
		return c.Status(fiber.StatusBadRequest).SendString("Invalid filename")
	}

	ext := strings.ToLower(filepath.Ext(filename))
	contentType, ok := allowedImageExts[ext]
	if !ok {
		return c.Status(fiber.StatusUnsupportedMediaType).SendString("File type not allowed")
	}

	safePath := filepath.Join("emojis", filename)

	absPath, err := filepath.Abs(safePath)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Internal error")
	}
	absEmojis, err := filepath.Abs("emojis")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Internal error")
	}
	if !strings.HasPrefix(absPath, absEmojis+string(filepath.Separator)) {
		return c.Status(fiber.StatusForbidden).SendString("Access denied")
	}

	info, err := os.Stat(safePath)
	if err != nil || info.IsDir() {
		return c.Status(fiber.StatusNotFound).SendString("Not found")
	}

	c.Set("Content-Type", contentType)
	return c.SendFile(safePath)
}

func GetEmojis(c *fiber.Ctx) error {
	files, err := utils.GetFiles("emojis")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	json := utils.ConvertToJSON(files)

	c.Set("Content-Type", "application/json")

	return c.Status(fiber.StatusOK).JSON(json)
}

func DownloadEmojis(c *fiber.Ctx) error {
	files, err := utils.GetFiles("emojis")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	zipBuffer, err := utils.ZipFiles(files, "emojis.zip")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString(err.Error())
	}

	c.Set("Content-Type", "application/zip")
	c.Set("Content-Disposition", "attachment; filename=emojis.zip")

	return c.Status(fiber.StatusOK).Send(zipBuffer.Bytes())
}
