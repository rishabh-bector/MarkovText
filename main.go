package main

import (
	"io/ioutil"
	"math/rand"
	"syscall/js"
	"time"
)

func main() {
	mm := MarkovModel{}

	// Seed generator
	rand.Seed(time.Now().UnixNano())

	// Read input text
	inFile, err := ioutil.ReadFile("./text/lincoln.txt")
	if err != nil {
		panic(err)
	}
	input := string(inFile)

	// Train model on input text
	mm.Train(input)

	// Load the model (no need to train if doing this)
	//mm.Load("./save.json")

	// Save the model
	mm.Save("./save.json")

	// Generate 5 random paragraphs
	mm.RandomizeState()
	println(mm.Generate(200), "\n")
	println(mm.Generate(200), "\n")
	println(mm.Generate(200), "\n")
	println(mm.Generate(200), "\n")
	println(mm.Generate(200), "\n")
}

func train(args []js.Value) {
	return
}
