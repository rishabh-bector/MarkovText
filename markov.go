package main

import (
	"encoding/json"
	"io/ioutil"
	"math/rand"
	"strings"

	"github.com/schollz/progressbar"
)

type MarkovModel struct {
	CurrentState *State
	States       []*State
}

func (mm *MarkovModel) Advance() {
	mm.CurrentState = mm.CurrentState.Advance()
}

func (mm *MarkovModel) Train(input string) {
	split := strings.Fields(input)

	// Calculate states
	println("\n\nCalculating states...\n")
	bar := progressbar.New(len(split))
	for _, data := range split {
		st := mm.FindState(data)
		if st == -1 {
			mm.States = append(mm.States, &State{
				Data:    data,
				Changes: make(map[*State]int),
			})
		}
		bar.Add(1)
	}

	// Calculate state changes
	println("\n\nCalculating state changes...\n")
	bar = progressbar.New(len(split))
	for ind, data := range split {
		if ind == len(split)-2 {
			break
		}

		s1 := mm.FindState(data)
		s2 := mm.FindState(split[ind+1])

		state1 := mm.States[s1]
		state2 := mm.States[s2]

		if _, ok := state1.Changes[state2]; ok {
			state1.Changes[state2]++
		} else {
			state1.Changes[state2] = 1
		}
		bar.Add(1)
	}

	// Calculate sample sizes
	println("\n\nCalculating sample sizes...\n")
	bar = progressbar.New(len(mm.States))
	for _, st := range mm.States {
		st.SampleSize = 0
		for _, amt := range st.Changes {
			st.SampleSize += amt
		}
		bar.Add(1)
	}
	println("\n\n")
	println("Num states:", len(mm.States), "\n\n")

	mm.CurrentState = mm.States[0]
}

func (mm *MarkovModel) FindState(data string) int {
	for ind, state := range mm.States {
		if state.Data == data {
			return ind
		}
	}
	return -1
}

func (mm *MarkovModel) RandomizeState() {
	mm.CurrentState = mm.States[rand.Intn(len(mm.States))]
}

func (mm *MarkovModel) Generate(length int) string {
	output := ""

	mm.RandomizeState()

	for i := 0; i < length; i++ {
		if mm.CurrentState != nil {
			output += mm.CurrentState.Data
			output += " "
		}
		mm.Advance()
	}

	return output
}

func (mm *MarkovModel) Save(path string) {
	markov := MarkovSerializable{
		States: []StateSerializable{},
	}

	println("\nSaving model...\n\n")
	bar := progressbar.New(len(mm.States))
	for _, st := range mm.States {
		bar.Add(1)
		serial := StateSerializable{
			Data:       st.Data,
			Changes:    make(map[string]int),
			SampleSize: st.SampleSize,
		}

		for ch, prob := range st.Changes {
			serial.Changes[ch.Data] = prob
		}

		markov.States = append(markov.States, serial)
	}
	println("\n\n")

	data, err := json.Marshal(markov)
	if err != nil {
		println(err.Error())
		return
	}
	ioutil.WriteFile(path, data, 0644)
}

func (mm *MarkovModel) Load(path string) {
	serial := MarkovSerializable{}
	mm.CurrentState = nil
	mm.States = []*State{}

	data, err := ioutil.ReadFile(path)
	if err != nil {
		panic(err)
	}

	err = json.Unmarshal(data, &serial)
	if err != nil {
		panic(err)
	}

	println("\nLoading model...\n\n")
	for _, serial := range serial.States {
		mm.States = append(mm.States, &State{
			Data:       serial.Data,
			Changes:    make(map[*State]int),
			SampleSize: serial.SampleSize,
		})
	}

	bar := progressbar.New(len(serial.States))
	for i, serial := range serial.States {
		bar.Add(1)
		for data, prob := range serial.Changes {
			state2 := mm.FindState(data)
			mm.States[i].Changes[mm.States[state2]] = prob
		}
	}

	mm.CurrentState = mm.States[0]
	println("\n\n")
}

type MarkovSerializable struct {
	States []StateSerializable `json:"states"`
}
