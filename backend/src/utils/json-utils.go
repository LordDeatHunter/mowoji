package utils

import (
	"encoding/json"
	"strings"
)

const ImageUrl = "https://emojis.deathunter.com/"

func ConvertToJSON(data []string) (string, error) {
	emojis := make(map[string]string)

	for _, file := range data {
		filename := strings.Split(file, ".")[0]
		emojis[filename] = ImageUrl + file
	}

	jsonData, err := json.Marshal(emojis)
	if err != nil {
		return "", err
	}

	return string(jsonData), nil
}
