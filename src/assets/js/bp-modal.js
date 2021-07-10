/**
 * bp-modal.js
 *
 * bp-modal is a simple modal solution using pure JavaScript and CSS
 *
 * Copyright (C) 2014 Brian Pratt
 *
 * The MIT Licence (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(() => {
  const setup = () => {
    const wrapper = document.getElementsByClassName("modals")[0];
    const triggers = document.querySelectorAll("[data-modal]");
    const modals = wrapper.getElementsByClassName("modal");
    const modal_map = {};

    const refresh = () => {
      Object.keys(modal_map).forEach((key) => {
        modal_map[key].element.classList.toggle(
          "modal-shown",
          modal_map[key].shown
        );
      });

      const num_shown = Object.keys(modal_map).filter(
        (key) => modal_map[key].shown
      ).length;

      wrapper.classList.toggle("modals-shown", num_shown > 0);
    };

    [...modals].forEach((modal) => {
      modal_map[modal.id] = {
        shown: false,
        element: modal,
      };

      // Stop the bubbling
      modal.addEventListener("click", (event) => event.stopPropagation());

      if (modal.classList.contains("modal-closeable")) {
        const close_btn = document.createElement("div");
        close_btn.classList.add("modal-close");
        close_btn.addEventListener("click", () => {
          modal_map[modal.id].shown = false;
          refresh();
        });
        modal.appendChild(close_btn);
      }
    });

    [...triggers].forEach((trigger) => {
      trigger.addEventListener("click", () => {
        modal_map[trigger.dataset.modal].shown = true;
        refresh();
      });
    });

    wrapper.addEventListener("click", () => {
      Object.keys(modal_map).forEach((key) => {
        modal_map[key].shown = false;
        refresh();
      });
    });

    refresh();
  };

  document.addEventListener("DOMContentLoaded", setup);
})();
