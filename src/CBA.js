// step1 timer - 2000 ms

//step 2
if ($('div#continue').length > 0) {

  var testName = $('h1.np').text().replace(/\s+/g, '');

  var dataJson = {
    questionText: $('#questionForm > pre').text(),
    areMultyAnswers: $('p.oGood').text() === 'Note: There may be more than one right answer.',
    answers: []
  };

  $('pre.np').each(function () {
    dataJson.answers.push({text: $(this).text().replace(/\s+$/g, '')})
  });

  console.log(JSON.stringify(dataJson, null, 2));

  $.ajax({
    type: 'post',
    url: 'https://localhost:8080/api/' + testName,
    data: JSON.stringify(dataJson),
    contentType: "application/json; charset=utf-8",
    traditional: true,
    success: function (data) {
      console.log('data were send');
      console.log(JSON.stringify(data, null, 2));
      if (data.answers.length > 0) {
        console.log('has answers');

        for (var i=0; i < data.answers.length; i++) {
          $('section').prepend(`<p style="color:blue">${data.answers[i]}</p>`);
        }
        $('section').prepend('<h2 style="color:darkblue">Answers:</h2>')

        if ($('div.oOptBox').length > 0) {
          $('pre.np').each(function () {
            if (data.answers.includes($(this).text().replace(/\s+$/g, ''))) {
              $(this).click();
            }
          });
        }

      } else {
        console.log('no answers');
        $('section').prepend('<h2 style="color:red">No answers!</h2>')
        if ($('div.oOptBox').length > 0) {
          $('div.oOptBox')[0].click();
        }

      }
    }
  });
}

// step3 timer - 1500 ms

// step4 submit-click
//div#continue
