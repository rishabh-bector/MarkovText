package main

import "math/rand"

type State struct {
	Data string

	Changes    map[*State]int
	SampleSize int
}

func (s *State) Advance() *State {
	if s.SampleSize < 2 {
		for ch := range s.Changes {
			return ch
		}
		return &State{Data: "END"}
	}

	r := rand.Intn(s.SampleSize)
	crand := 0

	for newState, prob := range s.Changes {
		if r >= crand && r < crand+prob {
			return newState
		}

		crand += prob
	}

	return nil
}

type StateSerializable struct {
	Data       string         `json:"data"`
	Changes    map[string]int `json:"changes"`
	SampleSize int            `json:"size"`
}
