package utils

import (
	"strings"
)

const ImageUrl = "https://emojis.deathunter.com/"

func ConvertToJSON(data []string) map[string]string {
	emojis := make(map[string]string)

	for _, file := range data {
		filename := strings.Split(file, ".")[0]
		emojis[filename] = ImageUrl + file
	}

	return emojis
}
