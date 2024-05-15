function loadmore(
	button,
	postType,
	numPages,
	idPost,
	taxonomy = null,
	termTitle = null,
	search = null
) {
	$(button).html('<span class="spinner"></span>');
	$(button).addClass("loading");

	if (idPost === "grid-podcast" || idPost === "grid-sos-vecino") {
		let taxonomyName = "";

		if (idPost === "grid-podcast") {
			taxonomyName = "programa";
		}

		if (idPost === "grid-sos-vecino") {
			taxonomyName = "denuncias";
		}

		const excludeTerms = [];

		$(button)
			.parents(".container")
			.find(".grid-posts .card")
			.each(function () {
				excludeTerms.push($(this).attr("term-id"));
			});

		$.ajax({
			data: {
				action: "load-more-taxonomy",
				taxonomy_name: taxonomyName,
				exclude: excludeTerms,
			},
			type: "POST",
			url: loadmore_params.ajaxurl,
			success: function (response) {
				const responseJSON = JSON.parse(response);

				responseJSON.forEach((term) => {
					const clonedCard = $(button)
						.parents(".container")
						.find(".grid-posts .card")
						.clone()[0];

					$(clonedCard).attr("term-id", term.id);

					$(clonedCard).find("figure a").attr("href", term.link);
					$(clonedCard).find("figure img").attr("src", term.imageURL);
					$(clonedCard).find("figure img").attr("alt", term.name);

					$(clonedCard).find(".text h3 a").attr("href", term.link);
					$(clonedCard).find(".text h3 a").html(term.name);

					$(button)
						.parents(".container")
						.find(".grid-posts")
						.append(clonedCard);
				});

				$(button).remove();
			},
		});

		return;
	}

	if (idPost === "grid-guia-90") {
		$.ajax({
			data: {
				action: "load-more-guia-90",
				active_filters: activeFilters,
				page: loadmore_params.current_page,
			},
			type: "POST",
			url: loadmore_params.ajaxurl,
			success: function (response) {
				const responseJSON = JSON.parse(response);

				if (responseJSON.length === 0) {
					$(button).remove();
					return;
				}

				responseJSON.forEach((post) => {
					console.log(post);

					const clonedCard = $(button)
						.parents(".main")
						.find(".grid-guia .card-guia")
						.clone()[0];

					$(clonedCard).find(".thumbnail-img").attr("href", post.permalink);
					$(clonedCard).find(".thumbnail-img img").attr("src", post.thumbnail);

					$(clonedCard).find(".info .tags .cat").attr("href", post.categoryUrl);
					$(clonedCard).find(".info .tags .cat").html(post.category);

					$(clonedCard)
						.find(".info .tags .btn-zone")
						.attr("href", post.zoneUrl);
					$(clonedCard).find(".info .tags .btn-zone").html(post.zone);

					$(clonedCard).find(".info .title").html(post.title);
					$(clonedCard).find(".info h3 a").attr("href", post.permalink);

					$(clonedCard)
						.find(".contact .email a")
						.attr("href", `mailto:${post.email}`);
					$(clonedCard).find(".contact .email a").html(post.email);

					$(clonedCard)
						.find(".contact .telephone a")
						.attr("href", `tel:${post.phone}`);
					$(clonedCard).find(".contact .telephone a").html(post.phone);

					$(button).parents(".main").find(".grid-guia").append(clonedCard);
				});

				loadmore_params.current_page++;

				$(button).html("Más comercios");
				$(button).removeClass("loading");
			},
		});

		return;
	}

	loadmore_params.max_page = numPages;

	$.ajax({
		// you can also use $.post here
		url: loadmore_params.ajaxurl, // AJAX handler
		data: {
			action: "loadmore",
			query: loadmore_params.posts, // that's how we get params from wp_localize_script() function
			page: loadmore_params.current_page,
			number_posts: loadmore_params.posts_per_page,
			post_type: postType,
			taxonomy: taxonomy,
			term: termTitle,
			search: search,
		},
		type: "POST",
		success: function (response) {
			var responseJSON, postItem;
			if (response) {
				responseJSON = JSON.parse(response);
				responseJSON.forEach(function (page) {
					if (idPost == "grid-category") {
						postItem = $(".grid-posts").find(".card").clone()[1];

						$(postItem)
							.find(".thumbnail-img")
							.find("picture")
							.find("source")
							.remove();
						$(postItem)
							.find(".thumbnail-img")
							.find("img")
							.attr("srcset", page.url_image);
						$(postItem)
							.find(".thumbnail-img")
							.find("img")
							.attr("src", page.url_image);
						$(postItem)
							.find(".thumbnail-img")
							.find("img")
							.attr("alt", page.title);
						$(postItem)
							.find(".thumbnail-img")
							.find("span")
							.attr("class", page.icon);

						$(postItem).find(".cat").attr("href", page.term_link);
						$(postItem).find(".cat").html(page.term_name);

						$(postItem).find(".thumbnail-img").attr("href", page.permalink);
						$(postItem).find(".title").attr("href", page.permalink);

						$(postItem).find(".title").html(page.title);

						$(".grid-posts").append(postItem);
						$(button).html("Más resultados");
						$(button).removeClass("loading");
					}
					if (idPost == "grid-opinion") {
						postItem = $(".grid-columna").find(".card-columna").clone()[1];

						$(postItem)
							.find(".main")
							.find(".link-autor")
							.attr("href", page.url_author);

						$(postItem)
							.find(".main")
							.find(".link-autor")
							.find("picture")
							.find("source")
							.remove();
						$(postItem)
							.find(".main")
							.find(".link-autor")
							.find("img")
							.attr("srcset", page.url_image_author);
						$(postItem)
							.find(".main")
							.find(".link-autor")
							.find("img")
							.attr("src", page.url_image_author);
						$(postItem)
							.find(".main")
							.find(".link-autor")
							.find("img")
							.attr("alt", page.author_nickname);

						$(postItem)
							.find(".main")
							.find(".author")
							.find("a")
							.attr("href", page.url_author);
						$(postItem)
							.find(".main")
							.find(".author")
							.find("a")
							.html(page.author);

						$(postItem).find(".title").attr("href", page.permalink);
						$(postItem).find(".title").html(page.title);

						$(".grid-columna").append(postItem);
						$(button).html("Más columnas");
						$(button).removeClass("loading");
					}
					if (idPost == "grid-especiales") {
						postItem = $(".grid-posts").find(".card").clone()[1];

						$(postItem)
							.find(".thumbnail-img")
							.find("picture")
							.find("source")
							.remove();
						$(postItem)
							.find(".thumbnail-img")
							.find("img")
							.attr("srcset", page.url_image);
						$(postItem)
							.find(".thumbnail-img")
							.find("img")
							.attr("src", page.url_image);
						$(postItem)
							.find(".thumbnail-img")
							.find("img")
							.attr("alt", page.title);

						$(postItem).find(".thumbnail-img").attr("href", page.permalink);
						$(postItem).find(".title").attr("href", page.permalink);

						$(postItem).find(".title").html(page.title);

						$(".grid-posts").append(postItem);
						$(button).html("Más especiales");
						$(button).removeClass("loading");
					}
					if (idPost == "grid-guia-90") {
						postItem = $(".grid-guia").find(".card-guia").clone()[1];

						$(postItem)
							.find(".thumbnail-img")
							.find("picture")
							.find("source")
							.remove();
						$(postItem)
							.find(".thumbnail-img")
							.find("img")
							.attr("srcset", page.url_image);
						$(postItem)
							.find(".thumbnail-img")
							.find("img")
							.attr("src", page.url_image);
						$(postItem)
							.find(".thumbnail-img")
							.find("img")
							.attr("alt", page.title);

						$(postItem).find(".thumbnail-img").attr("href", page.permalink);

						$(postItem)
							.find(".info")
							.find(".tags")
							.find(".cat")
							.attr("href", page.linkcat);
						$(postItem)
							.find(".info")
							.find(".tags")
							.find(".btn-zone")
							.attr("href", page.linkzone);
						$(postItem)
							.find(".info")
							.find(".tags")
							.find(".cat")
							.html(page.textcat);
						$(postItem)
							.find(".info")
							.find(".tags")
							.find(".btn-zone")
							.html(page.textzone);

						$(postItem)
							.find(".info")
							.find(".title")
							.attr("href", page.permalink);
						$(postItem).find(".info").find(".title").html(page.title);

						$(postItem)
							.find(".contact")
							.find(".contact-list")
							.find(".e-mail")
							.find("span")
							.attr("class", "icon icon-contact-email");
						$(postItem)
							.find(".contact")
							.find(".contact-list")
							.find(".e-mail")
							.find("span")
							.attr("aria-label", "Email");
						$(postItem)
							.find(".contact")
							.find(".contact-list")
							.find(".e-mail")
							.find(".text")
							.html(page.email);
						$(postItem)
							.find(".contact")
							.find(".contact-list")
							.find(".e-mail")
							.find(".text")
							.attr("href", page.url_email);

						$(postItem)
							.find(".contact")
							.find(".contact-list")
							.find(".telephone")
							.find("span")
							.attr("class", "icon icon-contact-phone");
						$(postItem)
							.find(".contact")
							.find(".contact-list")
							.find(".telephone")
							.find("span")
							.attr("aria-label", "Teléfono");
						$(postItem)
							.find(".contact")
							.find(".contact-list")
							.find(".telephone")
							.find(".text")
							.html(page.tel);
						$(postItem)
							.find(".contact")
							.find(".contact-list")
							.find(".telephone")
							.find(".text")
							.attr("href", page.url_tel);

						$(".grid-guia").append(postItem);
						$(button).html("Más comercios");
						$(button).removeClass("loading");
					}
					if (idPost == "grid-foros") {
						postItem = $(".grid-foro").find(".card-event").clone()[1];

						$(postItem)
							.find(".top")
							.find(".thumbnail-img")
							.find("picture")
							.find("source")
							.remove();
						$(postItem)
							.find(".top")
							.find(".thumbnail-img")
							.find("img")
							.attr("srcset", page.url_image);
						$(postItem)
							.find(".top")
							.find(".thumbnail-img")
							.find("img")
							.attr("src", page.url_image);
						$(postItem)
							.find(".top")
							.find(".thumbnail-img")
							.find("img")
							.attr("alt", page.title);

						$(postItem)
							.find(".info")
							.find(".cat-forum")
							.attr("href", page.tipo_evento_url);
						$(postItem).find(".info").find(".cat-forum").html(page.tipo_evento);
						$(postItem).find(".top").find(".modality").html(page.modalidad);

						$(postItem).find(".date").find(".day-number").html(page.day_number);
						$(postItem)
							.find(".date")
							.find(".month-year")
							.find(".month")
							.html(page.month);
						$(postItem)
							.find(".date")
							.find(".month-year")
							.find(".year")
							.html(page.year);

						$(postItem)
							.find(".top")
							.find(".thumbnail-img")
							.attr("href", page.permalink);
						$(postItem).find(".title").attr("href", page.permalink);

						$(postItem).find(".title").html(page.title);

						$(".grid-foro").append(postItem);
						$(button).html("Más foros");
						$(button).removeClass("loading");
					}
					if (idPost == "grid-webinars") {
						postItem = $(".grid-webinar").find(".card-event").clone()[1];

						$(postItem)
							.find(".top")
							.find(".thumbnail-img")
							.find("picture")
							.find("source")
							.remove();
						$(postItem)
							.find(".top")
							.find(".thumbnail-img")
							.find("img")
							.attr("srcset", page.url_image);
						$(postItem)
							.find(".top")
							.find(".thumbnail-img")
							.find("img")
							.attr("src", page.url_image);
						$(postItem)
							.find(".top")
							.find(".thumbnail-img")
							.find("img")
							.attr("alt", page.title);

						$(postItem)
							.find(".info")
							.find(".cat-forum")
							.attr("href", page.tipo_evento_url);
						$(postItem).find(".info").find(".cat-forum").html(page.tipo_evento);
						$(postItem).find(".top").find(".modality").html(page.modalidad);

						$(postItem).find(".date").find(".day-number").html(page.day_number);
						$(postItem)
							.find(".date")
							.find(".month-year")
							.find(".month")
							.html(page.month);
						$(postItem)
							.find(".date")
							.find(".month-year")
							.find(".year")
							.html(page.year);

						$(postItem)
							.find(".top")
							.find(".thumbnail-img")
							.attr("href", page.permalink);
						$(postItem).find(".title").attr("href", page.permalink);

						$(postItem).find(".title").html(page.title);

						$(".grid-webinar").append(postItem);
						$(button).html("Más webinar");
						$(button).removeClass("loading");
					}
				});

				loadmore_params.current_page++;
				if (loadmore_params.current_page == loadmore_params.max_page)
					button.remove(); // if last page, remove the button

				// you can also fire the "post-load" event here if you use a plugin that requires it
				// $( document.body ).trigger( 'post-load' );
			} else {
				button.remove(); // if no data, remove the button as well
			}
		},
		error: function (data) {
			console.log(data);
		},
	});
}
