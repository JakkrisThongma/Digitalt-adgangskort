using api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Services
{
	public class DatabaseInitialize
	{
		public void Initialize(ApiContext context)
		{
			context.Database.EnsureCreated();
			if (!context.Faqs.ToList().Any())
			{
				var faqs = new List<Models.Faq>
				{
					new Models.Faq
					{
						Question = "Hvordan kjøper jeg billett?",
						Answer = "Du kan kjøpe billett fra vy.no"
					},
					new Models.Faq
					{
						Question = "Hvordan kjøper jeg periodebillett?",
						Answer = "Det enkleste for deg er å kjøpe periodebilletten i appen. Vi tilbyr også periodebillett for Ruter, Kolumbus og Skyss. Enkelte varianter selger vi kun i appen."
					},
					new Models.Faq
					{
						Question = "Hvordan Henter jeg billetter kjøpt på vy.no?",
						Answer = "Det enkleste er å hente ut billetten via appen. Den kan også lastes ned som PDF eller hentes ut om bord, på billettautomat, på betjent stasjon og hos enkelte Narvesen-kiosker."
					},
					new Models.Faq
					{
						Question = "Hva er reisekort?",
						Answer = "Med reisekort reiser du med elektronisk billett hos Vy og Ruter, som samarbeider om kortsystemet elektronisk reisekort. Reisekortet gjelder i Oslo og Akershus."
					},
					new Models.Faq
					{
						Question = "Hvordan kjøper jeg interrailbillett?",
						Answer = "Du kan kjøpe Interrailbillett via kundeservice, betjente stasjoner eller på europarundt.no."
					},
					new Models.Faq
					{
						Question = "Det står at det er utsolgt. Kan jeg bli med likevel?",
						Answer = "Det er ikke mulig å kjøpe billetter til utsolgte tog. Du kan møte opp og ta sjansen på at det er kapasitet. Konduktøren gjør da en vurdering rett før avgang. Dersom det ikke er kapasitet om bord vil du ikke kunne bli med toget."
					},
					new Models.Faq
					{
						Question = "Hvordan får jeg plass i Komfort?",
						Answer = "Komfort selges som et tillegg til billetter på utvalgte strekninger og koster 100 kr per person. Du kan velge Komfort når du kjøper billetten på vy.no eller i appen. Du kan også kjøpe Komfort om bord av konduktøren, hvis det er ledig plass."
					},
					new Models.Faq
					{
						Question = "Jeg vil reise rundt i Norge i ferien. Finnes det en billett for dette?",
						Answer = "Vi tilbyr ikke en fleksibel billett som kan brukes på flere avganger rundt omkring i Norge. Det er heller ikke mulig å reise med Interrailbillett i eget land. For å reise rundt i Norge med toget, må du dermed bestille enkeltbilletter for de avgangene du ønsker."
					},
					new Models.Faq
					{
						Question = "Hvordan finner jeg Miniprisbilletter?",
						Answer = "Søk på ønsket dato og strekning i reiseplanleggeren. Hvis det er tilgjengelig Miniprisbilletter for din strekning og dato vil det være et av billettalternativene du kan velge. Vi tilbyr ikke en lavpriskalender eller lignende hvor du kan søke på flere datoer samtidig."
					}
				};

				foreach (var faq in faqs)
				{
					context.Faqs.Add(faq);
					context.SaveChanges();
				}
			}

		}
	}
}
