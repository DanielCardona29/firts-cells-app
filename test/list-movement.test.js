/* eslint-disable import/no-extraneous-dependencies */
import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing';
import '../app/elements/list-movement/list-movement.js';

import sinon from 'sinon';
import { bbvaAuto } from '@bbva-web-components/bbva-foundations-icons';

suite('list-movement', () => {
  let el;
  let elementShadowRoot;

  teardown(() => fixtureCleanup());

  suite('list-movement - with no configuration', () => {
    setup(async () => {
      el = await fixture(
        html`
          <list-movement></list-movement>
        `,
      );
      elementShadowRoot = el.shadowRoot;
      await el.updateComplete;
    });

    test('setting cardTitle shows card title', async () => {
      assert.notExists(elementShadowRoot.querySelector('bbva-link'));
      el.cardTitle = 'Example';
      await el.updateComplete;
      assert.exists(elementShadowRoot.querySelector('bbva-link'));
    });

    test('setting description shows description', async () => {
      assert.notExists(elementShadowRoot.querySelector('.description'));
      el.description = 'Example';
      await el.updateComplete;
      assert.exists(elementShadowRoot.querySelector('.description'));
    });

    test('setting concept shows concept block', async () => {
      assert.notExists(elementShadowRoot.querySelector('.concept'));
      el.concept = 'Transportation';
      await el.updateComplete;
      assert.exists(elementShadowRoot.querySelector('.concept'));
    });

    test('setting concept and icon shows concept with icon block', async () => {
      assert.notExists(elementShadowRoot.querySelector('.concept-icon'));
      el.concept = 'Transportation';
      el.icon = 'bbva:auto';
      await el.updateComplete;
      assert.exists(elementShadowRoot.querySelector('.concept-icon'));
    });

    test('setting mask shows bank-info block', async () => {
      assert.notExists(elementShadowRoot.querySelector('.bank-info'));
      el.mask = '12345678';
      await el.updateComplete;
      assert.exists(elementShadowRoot.querySelector('.bank-info'));
    });

    test('setting amount shows main amount block', async () => {
      assert.notExists(elementShadowRoot.querySelector('.main-amount'));
      el.amount = '111';
      await el.updateComplete;
      assert.exists(elementShadowRoot.querySelector('.main-amount'));
    });

    test('setting secondaryAmount shows secondary-amount block', async () => {
      assert.notExists(elementShadowRoot.querySelector('.secondary-amount'));
      el.secondaryAmount = '111';
      await el.updateComplete;
      assert.exists(elementShadowRoot.querySelector('.secondary-amount'));
    });
    test('a11y', () => assert.isAccessible(el));

    test('SHADOW DOM - Structure test', () => {
      assert.shadowDom.equalSnapshot(el);
    });

    test('LIGHT DOM - Structure test', () => {
      assert.lightDom.equalSnapshot(el);
    });
  });

  suite('<list-movement> with No description', () => {
    setup(async () => {
      el = await fixture(html`
        <list-movement
          aria-label="Ver detalle del pago con tarjeta"
          card-title="Pago con tarjeta"
          amount="2000.00"
          secondary-amount="2322"
          local-currency="EUR"
          currency-code="EUR"
          language="es"
          icon="bbva:auto"
          concept="Category"
        >
        </list-movement>
      `);
      elementShadowRoot = el.shadowRoot;
      await el.updateComplete;
    });

    test('It renders default properties', () => {
      const title = elementShadowRoot.querySelector('bbva-link');
      assert.equal(title.innerText, 'Pago con tarjeta');

      const { amount } = elementShadowRoot.querySelector('bbva-amount');
      assert.equal(amount, 2000.0);

      const concept = elementShadowRoot.querySelector('.concept-text');
      assert.equal(concept.textContent, 'Category');

      const conceptIcon = elementShadowRoot.querySelector('.concept-icon');
      assert.equal(conceptIcon.icon, 'bbva:auto');

      assert.equal(el.currencyCode, el.secondaryCurrencyCode);
      assert.equal(el.localCurrency, el.secondaryLocalCurrency);
    });
    test('a11y', () => assert.isAccessible(el));

    test('SHADOW DOM - Structure test', () => {
      assert.shadowDom.equalSnapshot(el, { ignoreAttributes: ['id'] });
    });

    test('LIGHT DOM - Structure test', () => {
      assert.lightDom.equalSnapshot(el);
    });
  });

  suite('<list-movement> with description', () => {
    setup(async () => {
      el = await fixture(html`
        <list-movement
          aria-label="Ver detalle del pago con tarjeta"
          card-title="Pago con tarjeta"
          description="Compra en Mercadona"
          amount="2000.00"
          secondary-amount="2322"
          local-currency="EUR"
          currency-code="EUR"
          language="es"
          icon="bbva:auto"
          concept="Category"
        >
        </list-movement>
      `);
      elementShadowRoot = el.shadowRoot;
      await el.updateComplete;
    });

    test('It renders description when its set', () => {
      const description = elementShadowRoot.querySelector('.description');
      assert.equal(description.textContent, 'Compra en Mercadona');
    });
    test('a11y', () => assert.isAccessible(el));

    suite('Semantic Dom', () => {
      test('DOM - Structure test', () => {
        assert.dom.equalSnapshot(el);
      });

      test('SHADOW DOM - Structure test', () => {
        assert.shadowDom.equalSnapshot(el, { ignoreAttributes: ['id'] });
      });

      test('LIGHT DOM - Structure test', () => {
        assert.lightDom.equalSnapshot(el);
      });
    });
  });

  suite('<list-movement> with full info', () => {
    setup(async () => {
      el = await fixture(html`
        <list-movement
          aria-label="Ver detalle del pago con tarjeta"
          card-title="Pago con tarjeta"
          description="Compra en Mercadona productos de belleza"
          amount="-2000.00"
          secondary-amount="-2322"
          local-currency="EUR"
          currency-code="EUR"
          language="es"
          mask="ES54029990012311234"
          bank-image="images/BBVA.svg"
          bank-image-alt-text="BBVA cuenta nomina"
          more-info="Lorem ipsum dolor sit amet"
          badge-text="Financiado"
          badge-text-type="warning"
          icon="bbva:auto"
          concept="Category"
        >
        </list-movement>
      `);
      elementShadowRoot = el.shadowRoot;
      await el.updateComplete;
    });

    test('It renders bank-info if mask exists', () => {
      const bankInfo = elementShadowRoot.querySelector('.bank-info');
      assert.exists(bankInfo);
      const mask = elementShadowRoot.querySelector('.wrapper');
      assert.exists(mask);
      const bankImage = elementShadowRoot.querySelector('.bank-image');
      assert.exists(bankImage);
    });

    test('It renders badgeText when its set', () => {
      const badgeText = elementShadowRoot.querySelector('.badge-text');
      assert.equal(badgeText.text, el.badgeText);
    });

    test('It renders moreInfo when its set', () => {
      const moreInfo = elementShadowRoot.querySelector('.more-info');
      assert.equal(moreInfo.textContent, el.moreInfo);
    });

    test('It sets the alternative text of "bank-image"', () => {
      const bankImage = elementShadowRoot.querySelector('.bank-image');
      assert.equal(bankImage.innerText, el.bankImageAltText);
    });

    test('It renders secondaryAmount when its set', () => {
      const secondaryAmount = elementShadowRoot.querySelector('.secondary-amount');

      assert.exists(secondaryAmount);
    });

    test('It dispatches proper event on click', async () => {
      const spy = sinon.spy();
      el.addEventListener('list-movement-item-click', spy);
      const button = elementShadowRoot.querySelector('button');
      button.click();
      assert.ok(spy.calledOnce, 'Event fired');
    });
    test('a11y', () => assert.isAccessible(el));

    suite('Semantic Dom', () => {
      test('DOM - Structure test', () => {
        assert.dom.equalSnapshot(el);
      });

      test('SHADOW DOM - Structure test', () => {
        assert.shadowDom.equalSnapshot(el, { ignoreAttributes: ['id'] });
      });

      test('LIGHT DOM - Structure test', () => {
        assert.lightDom.equalSnapshot(el);
      });
    });
  });

  suite('<list-movement> with secondary currency', () => {
    setup(async () => {
      el = await fixture(html`
        <list-movement
          aria-label="Ver detalle del pago con tarjeta"
          card-title="Title"
          amount="9999.99"
          secondary-amount="8"
          secondary-currency-code="USD"
          language="es">
        </list-movement>
      `);
      elementShadowRoot = el.shadowRoot;
      await el.updateComplete;
    });

    test('a11y', () => assert.isAccessible(el));

    test('', () => {
      const secondaryAmount = elementShadowRoot.querySelector('.secondary-amount');
      assert.equal(secondaryAmount.currencyCode, 'USD');
    })

    suite('Semantic Dom', () => {
      test('DOM - Structure test', () => {
        assert.dom.equalSnapshot(el);
      });

      test('SHADOW DOM - Structure test', () => {
        assert.shadowDom.equalSnapshot(el, { ignoreAttributes: ['id'] });
      });

      test('LIGHT DOM - Structure test', () => {
        assert.lightDom.equalSnapshot(el);
      });
    });
  });

  suite('<list-movement> no link', () => {
    setup(async () => {
      el = await fixture(html`
        <list-movement
          aria-label="Ver detalle del pago con tarjeta"
          card-title="Title"
          amount="9999.99"
          no-link
          language="es">
        </list-movement>
      `);
      elementShadowRoot = el.shadowRoot;
      await el.updateComplete;
    });

    test('a11y', () => assert.isAccessible(el));

    suite('Semantic Dom', () => {
      test('DOM - Structure test', () => {
        assert.dom.equalSnapshot(el);
      });

      test('SHADOW DOM - Structure test', () => {
        assert.shadowDom.equalSnapshot(el);
      });

      test('LIGHT DOM - Structure test', () => {
        assert.lightDom.equalSnapshot(el);
      });
    });
  });

  suite('<list-movement> with clip-entities', () => {
    setup(async () => {
      el = await fixture(html`
        <list-movement
          entity="entity:BBVAESMMXXX"
          aria-label="Ver detalle del pago con tarjeta"
          card-title="Title"
          amount="9999.99"
          no-link
          language="es">
        </list-movement>
      `);
      elementShadowRoot = el.shadowRoot;
      await el.updateComplete;
    });

    test('a11y', () => assert.isAccessible(el));

    suite('Semantic Dom', () => {
      test('DOM - Structure test', () => {
        assert.dom.equalSnapshot(el);
      });

      test('SHADOW DOM - Structure test', () => {
        assert.shadowDom.equalSnapshot(el, { ignoreAttributes: ['id'] });
      });

      test('LIGHT DOM - Structure test', () => {
        assert.lightDom.equalSnapshot(el);
      });
    });
  });

  suite('<list-movement> with clip-box icon', () => {
    setup(async () => {
      el = await fixture(html`
          <list-movement
            icon-clip="${bbvaAuto()}"
            highlight-category
            aria-label="View detail"
            card-title="Title"
            amount="9999.99"
            amount-type="income"
            language="es"
            description="A description that goes into two lines"
            attached
          >
        </list-movement>
      `);
      elementShadowRoot = el.shadowRoot;
      await el.updateComplete;
    });

    test('a11y', () => assert.isAccessible(el));

    suite('Semantic Dom', () => {
      test('DOM - Structure test', () => {
        assert.dom.equalSnapshot(el);
      });

      test('SHADOW DOM - Structure test', () => {
        assert.shadowDom.equalSnapshot(el, { ignoreAttributes: ['id'] });
      });

      test('LIGHT DOM - Structure test', () => {
        assert.lightDom.equalSnapshot(el);
      });
    });
  });

  suite('<list-movement> with clip-box image', () => {
    setup(async () => {
      el = await fixture(html`
          <list-movement
            image="data:image/gif;base64,fake"
            highlight-category
            aria-label="View detail"
            card-title="Title"
            amount="9999.99"
            amount-type="income"
            language="es"
            description="A description that goes into two lines"
            attached
          >
        </list-movement>
      `);
      elementShadowRoot = el.shadowRoot;
      await el.updateComplete;
    });

    test('a11y', () => assert.isAccessible(el));

    suite('Semantic Dom', () => {
      test('DOM - Structure test', () => {
        assert.dom.equalSnapshot(el);
      });

      test('SHADOW DOM - Structure test', () => {
        assert.shadowDom.equalSnapshot(el, { ignoreAttributes: ['id'] });
      });

      test('LIGHT DOM - Structure test', () => {
        assert.lightDom.equalSnapshot(el);
      });
    });
  });

  suite('<list-movement> with badge highlight text', () => {
    setup(async () => {
      el = await fixture(html`
          <list-movement
            image="data:image/gif;base64,fake"
            highlight-category
            aria-label="View detail"
            card-title="Title"
            amount="9999.99"
            amount-type="income"
            badge-highlight-text="Financed"
            badge-highlight-type="default"
            language="es"
            description="A description that goes into two lines"
            attached
          >
        </list-movement>
      `);
      elementShadowRoot = el.shadowRoot;
      await el.updateComplete;
    });

    test('a11y', () => assert.isAccessible(el));

    suite('Semantic Dom', () => {
      test('DOM - Structure test', () => {
        assert.dom.equalSnapshot(el);
      });

      test('SHADOW DOM - Structure test', () => {
        assert.shadowDom.equalSnapshot(el, { ignoreAttributes: ['id'] });
      });

      test('LIGHT DOM - Structure test', () => {
        assert.lightDom.equalSnapshot(el);
      });
    });
  });
});
