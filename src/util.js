function calculate_answer(guess, conversion_direction){
    if (conversion_direction == 'c_to_f'){
      return (guess * 1.8) + 32
    }
    else return (guess - 32) * 1.8
  }
  
  function get_difficulty_tolerance(level){
    if (level == 'easy') return 1
    else return 0.5
  }
  
  function calculate_correctness(guess, answer, tolerance){
      if (guess <= answer + tolerance && guess >= answer - tolerance){ 
      return [true, guess, answer]
    }
    else return [false, guess, answer]
  }
  
  function validate_guess(input, guess, conversion_direction, difficulty = 'easy'){
    answer = calculate_answer(guess, conversion_direction)
    tolerance = get_difficulty_tolerance(difficulty)
    return calculate_correctness(guess, answer, tolerance)
  }  