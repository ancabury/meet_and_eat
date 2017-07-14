require 'spec_helper'
describe Restaurants::RandomSelection do
  describe '#perform' do
    subject { Restaurants::RandomSelection.new(request) }

    context 'when the request has empty fields' do
      let(:request) { stub_model(Request) }
      it 'should not return a result' do
        expect(subject.perform).to be(false)
      end
    end

    context 'when the request receives fields' do
      let(:request) { stub_model(Request, meal_type: 'dinner', location: 'Cluj') }
      let(:searcher) { double }
      let(:restaurants) { double }
      let(:result) { double }

      before do
        allow(Restaurants::FoursquareSearcher).to receive(:new)
          .with(request.meal_type, request.location)
          .and_return(searcher)
        allow(searcher).to receive(:formatted_result).and_return(restaurants)
        allow(restaurants).to receive(:sample).and_return(result)
      end

      it 'should return a result' do
        expect(subject.perform).to be(result)
      end
    end
  end
end
