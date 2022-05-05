

const dataset_keys = ["bag", "bowl",  "box",  "hat",  "jar",  "mug",  "plate",  "shoe",  "sofa",  "table",  "toy"]
for (let cls of dataset_keys) {
  $('#dataset-classes').append('<button class="list-group-item list-group-item-action">' + cls + '</button>');
}
$('#dataset-classes .list-group-item:first').addClass("active");


for (let i = 1; i < 9; i++) {
  let ex = "Example" + String(i)
  $('#visual-classes').append('<button class="list-group-item list-group-item-action">' + ex + '</button>');
}
$('#visual-classes .list-group-item:first').addClass("active");

for (let i = 1; i < 3; i++) {
  let ex = "Example" + String(i)
  $('#noisy-classes').append('<button class="list-group-item list-group-item-action">' + ex + '</button>');
}
$('#noisy-classes .list-group-item:first').addClass("active");

for (let i = 1; i < 4; i++) {
  let ex = "Example" + String(i)
  $('#ablation-classes').append('<button class="list-group-item list-group-item-action">' + ex + '</button>');
}
$('#ablation-classes .list-group-item:first').addClass("active");


$('#dataset-classes .list-group-item').click((e) => {
  $('#dataset-classes .list-group-item').removeClass("active");
  $(e.target).addClass("active");
  const cls = $(e.target).text();
  $('#tab-dataset-img .img-fluid').each((i, e) => {
    $(e).attr("src", 'img/dataset/' + cls + String(i + 1) + ".png");
  });
  $("#dataset-iframe").attr("src", "models/dataset-"+ cls + ".html")
});

$('#visual-classes .list-group-item').click((e) => {
  $('#visual-classes .list-group-item').removeClass("active");
  $(e.target).addClass("active");
  const example = $(e.target).text();
  $("#visual-iframe").attr("src", "models/visual-"+ example + ".html")
});
$('#noisy-classes .list-group-item').click((e) => {
  $('#noisy-classes .list-group-item').removeClass("active");
  $(e.target).addClass("active");
  const example = $(e.target).text();
  $("#noisy-iframe").attr("src", "models/noisy-"+ example + ".html")
});
$('#ablation-classes .list-group-item').click((e) => {
  $('#ablation-classes .list-group-item').removeClass("active");
  $(e.target).addClass("active");
  const example = $(e.target).text();
  $("#ablation-iframe").attr("src", "models/ablation-"+ example + ".html")
});


$("#visual-classes .list-group-item").prop("disabled", true);
$('#tab-visual-img-button').on('shown.bs.tab', (e) => {
  $("#visual-classes .list-group-item").prop("disabled", true);
})
$("#noisy-classes .list-group-item").prop("disabled", true);
$('#tab-noisy-img-button').on('shown.bs.tab', (e) => {
  $("#noisy-classes .list-group-item").prop("disabled", true);
})
$("#ablation-classes .list-group-item").prop("disabled", true);
$('#tab-ablation-img-button').on('shown.bs.tab', (e) => {
  $("#ablation-classes .list-group-item").prop("disabled", true);
})

$('#tab-visual-3d-button').on('shown.bs.tab', (e) => {
  $("#visual-classes .list-group-item").prop("disabled", false);
  for (let i = 1; i <= 6; i++) {
    $('#canvas-' + String(i)).show()
    $('#canvas-' + String(i)).detach().prependTo('#visual-slot-' + String(i));
  }
  for (let i = 7; i <= 9; i++) {
    $('#canvas-' + String(i)).hide()
  }
});

$('#tab-noisy-3d-button').on('shown.bs.tab', (e) => {
  $("#noisy-classes .list-group-item").prop("disabled", false);
  for (let i = 1; i <= 6; i++) {
    $('#canvas-' + String(i)).show()
    $('#canvas-' + String(i)).detach().prependTo('#noisy-slot-' + String(i));
  }
  for (let i = 7; i <= 9; i++) {
    $('#canvas-' + String(i)).hide()
  }
});

$('#tab-ablation-3d-button').on('shown.bs.tab', (e) => {
  $("#ablation-classes .list-group-item").prop("disabled", false);
  for (let i = 1; i <= 6; i++) {
    $('#canvas-' + String(i)).show()
    $('#canvas-' + String(i)).detach().prependTo('#ablation-slot-' + String(i));
  }
  for (let i = 7; i <= 9; i++) {
    $('#canvas-' + String(i)).hide()
  }
});
