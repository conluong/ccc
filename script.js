document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mainMenu = document.querySelector(".main-menu")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      mainMenu.classList.toggle("show")
    })
  }

  // Tab Functionality
  const tabs = document.querySelectorAll(".tab")

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")
      const tabContainer = this.closest(".tabs, .scholarship-tabs, .university-detail-tabs")
      const tabPanes = tabContainer.querySelectorAll(".tab-pane")

      // Remove active class from all tabs and panes in this container only
      tabContainer.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"))
      tabPanes.forEach((pane) => pane.classList.remove("active"))

      // Add active class to clicked tab and corresponding pane
      this.classList.add("active")

      // Find the tab pane within the same modal
      const modal = this.closest(".modal")
      if (modal) {
        const pane = modal.querySelector(`#${tabId}`)
        if (pane) {
          pane.classList.add("active")
        }
      } else {
        document.getElementById(tabId).classList.add("active")
      }
    })
  })

  // University Filtering
  const regionFilter = document.getElementById("region")
  const typeFilter = document.getElementById("type")
  const majorFilter = document.getElementById("major")
  const universityCards = document.querySelectorAll(".university-card")

  function filterUniversities() {
    const regionValue = regionFilter.value
    const typeValue = typeFilter.value
    const majorValue = majorFilter.value

    universityCards.forEach((card) => {
      const regionMatch = regionValue === "all" || card.getAttribute("data-region") === regionValue
      const typeMatch = typeValue === "all" || card.getAttribute("data-type") === typeValue

      // For simplicity, we're not implementing major filtering in this demo
      // In a real application, you would add data-major attributes to cards

      if (regionMatch && typeMatch) {
        card.style.display = "flex"
      } else {
        card.style.display = "none"
      }
    })
  }

  if (regionFilter && typeFilter && majorFilter) {
    regionFilter.addEventListener("change", filterUniversities)
    typeFilter.addEventListener("change", filterUniversities)
    majorFilter.addEventListener("change", filterUniversities)
  }

  // University Detail Modals
  const universityDetailBtns = document.querySelectorAll(".btn-details")
  const closeModalBtns = document.querySelectorAll(".close-modal")

  universityDetailBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault()
      const universityId = this.getAttribute("data-id")
      const modal = document.getElementById(`university-${universityId}`)

      if (modal) {
        modal.style.display = "block"
        document.body.style.overflow = "hidden"
      }
    })
  })

  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal")
      if (modal) {
        modal.style.display = "none"
        document.body.style.overflow = "auto"
      }
    })
  })

  // Close modal when clicking outside of modal content
  const modals = document.querySelectorAll(".modal")

  modals.forEach((modal) => {
    modal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.style.display = "none"
        document.body.style.overflow = "auto"
      }
    })
  })

  // Back to Top Button
  const backToTopBtn = document.querySelector(".back-to-top")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show")
    } else {
      backToTopBtn.classList.remove("show")
    }
  })

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Star Rating Functionality
  const ratingStars = document.querySelectorAll(".rating-select i")

  ratingStars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      for (let i = 0; i <= index; i++) {
        ratingStars[i].classList.remove("far")
        ratingStars[i].classList.add("fas")
      }
      for (let i = index + 1; i < ratingStars.length; i++) {
        ratingStars[i].classList.remove("fas")
        ratingStars[i].classList.add("far")
      }
    })

    star.addEventListener("click", () => {
      for (let i = 0; i <= index; i++) {
        ratingStars[i].classList.remove("far")
        ratingStars[i].classList.add("fas")
        ratingStars[i].style.color = "#f59e0b"
      }
      for (let i = index + 1; i < ratingStars.length; i++) {
        ratingStars[i].classList.remove("fas")
        ratingStars[i].classList.add("far")
        ratingStars[i].style.color = ""
      }
    })
  })

  // Form Submission
  const contactForm = document.getElementById("contactForm")
  const reviewForms = document.querySelectorAll("#reviewForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      alert("Cảm ơn bạn đã gửi tin nhắn. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất!")
      contactForm.reset()
    })
  }

  if (reviewForms.length > 0) {
    reviewForms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault()
        alert("Cảm ơn bạn đã gửi đánh giá!")
        form.reset()
        // Reset stars
        const stars = form.querySelectorAll(".rating-select i")
        stars.forEach((star) => {
          star.classList.remove("fas")
          star.classList.add("far")
          star.style.color = ""
        })
      })
    })
  }

  // Load More Universities
  const loadMoreBtn = document.querySelector(".btn-load-more")

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      // In a real application, this would load more universities from the server
      // For this demo, we'll just show a message
      alert("Tính năng đang được phát triển. Vui lòng quay lại sau!")
    })
  }

  // Smooth Scrolling for Navigation Links
  const navLinks = document.querySelectorAll("header a, .hero a")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      if (href.startsWith("#") && href !== "#") {
        e.preventDefault()
        const targetSection = document.querySelector(href)

        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: "smooth",
          })

          // Close mobile menu if open
          if (mainMenu.classList.contains("show")) {
            mainMenu.classList.remove("show")
          }
        }
      }
    })
  })

  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".feature, .university-card, .news-card, .scholarship-card, .forum-category, .contact-card",
    )

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial state for animated elements
  const elementsToAnimate = document.querySelectorAll(
    ".feature, .university-card, .news-card, .scholarship-card, .forum-category, .contact-card",
  )

  elementsToAnimate.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Run animation on scroll
  window.addEventListener("scroll", animateOnScroll)

  // Run once on page load
  animateOnScroll()
})

document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const chatToggleBtn = document.getElementById('chat-toggle-btn');
  const chatWindow = document.getElementById('chat-window');
  const minimizeBtn = document.getElementById('minimize-btn');
  const closeBtn = document.getElementById('close-btn');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');
  const chatMessages = document.getElementById('chat-messages');
  const chatHeader = document.querySelector('.chat-header');

  // State
  let isOpen = false;
  let isMinimized = false;
  let isWaitingForResponse = false;

  // Mẫu câu trả lời cho bot (sử dụng khi không có API)
  const sampleResponses = {
    "default": "Xin lỗi, tôi không có thông tin về câu hỏi này.",
    "hello": " xin chào",
    "có gì hot": "chả có gì hot",
  };

  // Hàm kiểm tra từ khóa trong câu hỏi
  function findKeywordInQuestion(question) {
    question = question.toLowerCase();
    for (const keyword in sampleResponses) {
      if (keyword !== 'default' && question.includes(keyword)) {
        return keyword;
      }
    }
    return 'default';
  }

  // Hàm thêm tin nhắn vào chat
  function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Cuộn xuống tin nhắn mới nhất
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Hiển thị typing indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.className = 'typing-dot';
      typingDiv.appendChild(dot);
    }
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Ẩn typing indicator
  function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Xử lý gửi tin nhắn
  async function handleSendMessage(e) {
    if (e) e.preventDefault();
    
    const message = chatInput.value.trim();
    if (!message || isWaitingForResponse) return;
    
    // Thêm tin nhắn người dùng vào chat
    addMessage(message, true);
    chatInput.value = '';
    
    // Hiển thị đang nhập
    isWaitingForResponse = true;
    showTypingIndicator();
    
    // Mô phỏng độ trễ phản hồi
    setTimeout(() => {
      // Ẩn đang nhập
      hideTypingIndicator();
      
      // Tìm từ khóa trong câu hỏi
      const keyword = findKeywordInQuestion(message);
      const response = sampleResponses[keyword];
      
      // Thêm phản hồi của bot
      addMessage(response);
      isWaitingForResponse = false;
    }, 1500);
  }

  // Mở/đóng chat
  function toggleChat() {
    if (isMinimized) {
      isMinimized = false;
      chatWindow.classList.remove('minimized');
    } else {
      isOpen = !isOpen;
      chatWindow.classList.toggle('open', isOpen);
    }
  }

  // Thu nhỏ chat
  function minimizeChat(e) {
    e.stopPropagation();
    isMinimized = true;
    chatWindow.classList.add('minimized');
  }

  // Đóng chat
  function closeChat(e) {
    e.stopPropagation();
    isOpen = false;
    chatWindow.classList.remove('open');
  }

  // Event Listeners
  chatToggleBtn.addEventListener('click', toggleChat);
  minimizeBtn.addEventListener('click', minimizeChat);
  closeBtn.addEventListener('click', closeChat);
  chatForm.addEventListener('submit', handleSendMessage);
  chatHeader.addEventListener('click', () => {
    if (isMinimized) {
      isMinimized = false;
      chatWindow.classList.remove('minimized');
    }
  });

  // Kiểm tra input để enable/disable nút gửi
  chatInput.addEventListener('input', () => {
    sendBtn.disabled = chatInput.value.trim() === '' || isWaitingForResponse;
  });

  // Kiểm tra dark mode
  function checkDarkMode() {
    const isDarkMode = document.body.classList.contains('dark');
    document.getElementById('wildlife-chatbot').classList.toggle('dark', isDarkMode);
  }

  // Kiểm tra dark mode ban đầu
  checkDarkMode();

  // Theo dõi thay đổi dark mode
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.attributeName === 'class') {
        checkDarkMode();
      }
    });
  });

  observer.observe(document.body, { attributes: true });
});
