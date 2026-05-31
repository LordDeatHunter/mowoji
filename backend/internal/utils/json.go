package utils

import (
	"os"
	"strings"

	"gopkg.in/yaml.v3"
)

const ImageUrl = "https://emojis.deathunter.com/"

type Emoji struct {
	URL  string   `yaml:"url"`
	Tags []string `yaml:"tags"`
	NSFW bool     `yaml:"nsfw"`
}

type Metadata struct {
	Tags []string `yaml:"tags"`
	NSFW bool     `yaml:"nsfw"`
}

func ConvertToJSON(files []string) map[string]Emoji {
	emojis := make(map[string]Emoji)

	metadataFile, err := os.ReadFile("emojis/metadata.yaml")
	if err != nil {
		return nil
	}

	metadata := make(map[string]Metadata)
	err = yaml.Unmarshal(metadataFile, &metadata)
	if err != nil {
		return nil
	}

	for _, file := range files {
		filename := strings.Split(file, ".")[0]
		emojiMetadata, ok := metadata[file]

		tags := []string{}
		nsfw := false

		if ok {
			if emojiMetadata.Tags != nil {
				tags = emojiMetadata.Tags
			}
			nsfw = emojiMetadata.NSFW
		}

		emojis[filename] = Emoji{
			URL:  ImageUrl + file,
			Tags: tags,
			NSFW: nsfw,
		}
	}

	return emojis
}
