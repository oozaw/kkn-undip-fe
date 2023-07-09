loader: undefined,

showLoading(isLoading) {
  if (isLoading && !this.loader) {
    this.loader = this.$loading.show();
  } else if (!isLoading && this.loader) {
    setTimeout(() => {
      this.loader.hide();
      this.loader = undefined;
    }, 400);
  }
},

showLoading(isLoading) {
  if (isLoading && !this.loader) {
    this.loader = this.$loading.show();
  } else if (!isLoading && this.loader) {
      this.loader.hide();
      this.loader = undefined;
  }
},


this.showLoading(true);
this.showLoading(false);