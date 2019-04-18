package main

import (
	"math/rand"
	"strconv"
	"syscall/js"
	"time"
)

var done = make(chan struct{})
var mm MarkovModel

var l1 = 0
var l2 = 0
var l3 = 0
var last1 = 0
var last2 = 0
var last3 = 0

func main() {
	// Webassembly
	callback := js.FuncOf(goFunc)
	defer callback.Release()
	setTrainFunc := js.Global().Get("setGoFunc")
	setTrainFunc.Invoke(callback)

	mm = MarkovModel{
		StatusCallback: statusCallback,
	}

	// Seed generator
	rand.Seed(time.Now().UnixNano())

	<-done
}

func goFunc(v js.Value, args []js.Value) interface{} {
	fn := args[0].String()

	if fn == "train" {
		train(args[1].String())
	}

	if fn == "generate" {
		i, _ := strconv.Atoi(args[1].String())
		js.Global().Set("output", mm.Generate(i))
	}

	return nil
}

func train(input string) {
	mm.Train(input)
}

func statusCallback(x, p int) {
	if x == 0 && last1 != p {
		l1 = p
		last1 = p

		js.Global().Set("l1", l1)
		js.Global().Get("setLoading").Invoke()
	}
	if x == 1 && last2 != p {
		l2 = p
		last2 = p

		js.Global().Set("l2", l2)
		js.Global().Get("setLoading").Invoke()
	}
	if x == 2 && last3 != p {
		l3 = p
		last3 = p

		js.Global().Set("l3", l3)
		js.Global().Get("setLoading").Invoke()
	}
}
